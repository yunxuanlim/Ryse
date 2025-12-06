import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize Gemini AI
// Note: In production, store API key in environment variable
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY || 'YOUR_API_KEY_HERE';

let model: any = null;
if (API_KEY && API_KEY !== 'YOUR_API_KEY_HERE') {
  try {
    const genAI = new GoogleGenerativeAI(API_KEY);
    // Use gemini-2.5-flash for the latest Gemini 2.5 Flash model
    model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });
  } catch (error) {
    console.error('Failed to initialize Gemini AI:', error);
  }
}

interface ParsedResponse {
  message: string;
  action?: {
    type: 'transfer' | 'check_balance' | 'check_earnings' | 'check_ryscore' | 'check_cashflow' | 'apply_loan';
    data?: {
      amount?: string;
      recipient?: string;
      loanAmount?: string;
    };
  };
}

export async function chatWithGemini(userMessage: string, conversationHistory: Array<{role: 'user' | 'ai', text: string}>): Promise<ParsedResponse> {
  // Fallback response if API key is not configured
  if (!model || !API_KEY || API_KEY === 'YOUR_API_KEY_HERE') {
    // Use pattern matching for basic functionality without API
    const parsedResponse: ParsedResponse = {
      message: '',
    };

    // Detect transfer action
    const transferPattern = /transfer|send|give|pay|want to transfer|need to transfer/i;
    if (transferPattern.test(userMessage)) {
      // Extract amount (look for RM, ringgit, or numbers)
      const amountMatch = userMessage.match(/(?:RM|ringgit|rm)\s*(\d+(?:\.\d+)?)|(\d+(?:\.\d+)?)\s*(?:RM|ringgit|rm)/i) || 
                         userMessage.match(/(\d+(?:\.\d+)?)/);
      const amount = amountMatch ? (amountMatch[1] || amountMatch[2] || amountMatch[0]) : null;

      // Extract recipient (look for "to [name]" pattern)
      const recipientMatch = userMessage.match(/(?:to|for)\s+([a-z]+)/i);
      const recipient = recipientMatch ? recipientMatch[1] : null;

      if (amount && recipient) {
        const recipientName = recipient.charAt(0).toUpperCase() + recipient.slice(1).toLowerCase();
        parsedResponse.message = `I'll help you transfer RM ${amount} to ${recipientName}. Let me set that up for you.`;
        parsedResponse.action = {
          type: 'transfer',
          data: {
            amount: amount,
            recipient: recipientName,
          },
        };
        return parsedResponse;
      } else if (transferPattern.test(userMessage) && /money|fund|cash/i.test(userMessage)) {
        // User wants to transfer money but didn't specify details - navigate to transfer page
        parsedResponse.message = 'I\'ll help you transfer money. Let me take you to the transfer page.';
        parsedResponse.action = {
          type: 'transfer',
          data: {
            amount: '',
            recipient: '',
          },
        };
        return parsedResponse;
      }
    } else if (/balance|how much|current balance/i.test(userMessage)) {
      parsedResponse.message = 'Your current balance is RM 3,847.50. You have RM 2,500 in savings.';
      parsedResponse.action = { type: 'check_balance' };
      return parsedResponse;
    } else if (/earn|earning|income/i.test(userMessage)) {
      parsedResponse.message = 'This month you earned RM 5,240 from Grab and RM 1,830 from Foodpanda. Total: RM 7,070.';
      parsedResponse.action = { type: 'check_earnings' };
      return parsedResponse;
    } else if (/ryscore|score/i.test(userMessage)) {
      parsedResponse.message = 'Your RyScore is 720 (Gold Tier). Complete 15 more deliveries to reach Platinum!';
      parsedResponse.action = { type: 'check_ryscore' };
      return parsedResponse;
    } else if (/cashflow|cash flow|financial health/i.test(userMessage)) {
      parsedResponse.message = 'Your cashflow is healthy! You earned 22% more this week. However, I predict you may be short RM 150 next Tuesday for bills.';
      parsedResponse.action = { type: 'check_cashflow' };
      return parsedResponse;
    } else if (/borrow|lend|loan|advance|ryse advance|need money|want to borrow|apply for loan/i.test(userMessage)) {
      // Extract loan amount if mentioned
      const amountMatch = userMessage.match(/(?:RM|ringgit|rm)\s*(\d+(?:\.\d+)?)|(\d+(?:\.\d+)?)\s*(?:RM|ringgit|rm)/i) || 
                         userMessage.match(/(\d+(?:\.\d+)?)/);
      const loanAmount = amountMatch ? (amountMatch[1] || amountMatch[2] || amountMatch[0]) : null;
      
      let message = 'I\'ll help you apply for Ryse Advance! Based on your RyScore, you can borrow up to RM 1,000.';
      if (loanAmount) {
        message = `I'll help you apply for RM ${loanAmount} through Ryse Advance! Based on your RyScore, you can borrow up to RM 1,000.`;
      }
      message += ' Let me take you to the application page.';
      
      parsedResponse.message = message;
      parsedResponse.action = { 
        type: 'apply_loan',
        data: loanAmount ? { loanAmount: loanAmount } : undefined
      };
      return parsedResponse;
    }

    // Generic fallback
    parsedResponse.message = 'I understand. However, to use the full AI capabilities, please configure your Gemini API key in the .env file as VITE_GEMINI_API_KEY. For now, I can help with basic commands like checking balance, earnings, transfers, or applying for loans.';
    return parsedResponse;
  }

  try {
    // Build conversation context
    const systemPrompt = `You are Ryse AI, a helpful banking assistant. You help users with:
- Checking account balance
- Checking earnings
- Checking RyScore
- Checking cashflow
- Transferring money to recipients
- Applying for Ryse Advance loans

When a user wants to transfer money, extract the amount and recipient name from their message.
When a user mentions borrowing, lending, loans, or Ryse Advance, help them apply for a loan.

Respond naturally and helpfully. If they mention a transfer, acknowledge it and confirm the details by saying something like "It looks like you want to transfer RM[amount] to [recipient]. Is that correct? I can help you with that!" or "Great! Your transfer of RM[amount] to [recipient] is being processed."
If they mention loans, borrowing, or lending, guide them to apply for Ryse Advance.

Example user messages:
- "transfer RM20 to olivia" -> Extract: amount=20, recipient=olivia
- "send 50 ringgit to alia" -> Extract: amount=50, recipient=alia
- "I want to transfer 100 to john" -> Extract: amount=100, recipient=john
- "I need to borrow money" -> Guide to Ryse Advance
- "apply for loan" -> Guide to Ryse Advance
- "I want to lend" -> Guide to Ryse Advance (note: Ryse Advance is for borrowing)

Format your response as natural text. If it's a transfer request, make it clear in your response.`;

    // Build conversation history for context
    let conversationText = systemPrompt + '\n\n';
    conversationHistory.slice(-6).forEach(msg => {
      conversationText += `${msg.role === 'user' ? 'User' : 'Assistant'}: ${msg.text}\n`;
    });
    conversationText += `User: ${userMessage}\nAssistant:`;

    const result = await model.generateContent(conversationText);
    const response = await result.response;
    const aiMessage = response.text();

    // Parse the response to detect actions
    const parsedResponse: ParsedResponse = {
      message: aiMessage,
    };

    // Detect transfer action
    const transferPattern = /transfer|send|give|pay|want to transfer|need to transfer/i;
    if (transferPattern.test(userMessage)) {
      // Extract amount (look for RM, ringgit, or numbers)
      const amountMatch = userMessage.match(/(?:RM|ringgit|rm)\s*(\d+(?:\.\d+)?)|(\d+(?:\.\d+)?)\s*(?:RM|ringgit|rm)/i) || 
                         userMessage.match(/(\d+(?:\.\d+)?)/);
      const amount = amountMatch ? (amountMatch[1] || amountMatch[2] || amountMatch[0]) : null;

      // Extract recipient (look for "to [name]" pattern)
      const recipientMatch = userMessage.match(/(?:to|for)\s+([a-z]+)/i);
      const recipient = recipientMatch ? recipientMatch[1] : null;

      // If user wants to transfer but didn't specify amount/recipient, still trigger transfer action
      if (amount && recipient) {
        parsedResponse.action = {
          type: 'transfer',
          data: {
            amount: amount,
            recipient: recipient.charAt(0).toUpperCase() + recipient.slice(1).toLowerCase(),
          },
        };
      } else if (transferPattern.test(userMessage) && /money|fund|cash/i.test(userMessage)) {
        // User wants to transfer money but didn't specify details - navigate to transfer page
        parsedResponse.action = {
          type: 'transfer',
          data: {
            amount: '',
            recipient: '',
          },
        };
      }
    } else if (/balance|how much|current balance/i.test(userMessage)) {
      parsedResponse.action = { type: 'check_balance' };
    } else if (/earn|earning|income/i.test(userMessage)) {
      parsedResponse.action = { type: 'check_earnings' };
    } else if (/ryscore|score/i.test(userMessage)) {
      parsedResponse.action = { type: 'check_ryscore' };
    } else if (/cashflow|cash flow|financial health/i.test(userMessage)) {
      parsedResponse.action = { type: 'check_cashflow' };
    } else if (/borrow|lend|loan|advance|ryse advance|need money|want to borrow|apply for loan/i.test(userMessage)) {
      // Extract loan amount if mentioned
      const amountMatch = userMessage.match(/(?:RM|ringgit|rm)\s*(\d+(?:\.\d+)?)|(\d+(?:\.\d+)?)\s*(?:RM|ringgit|rm)/i) || 
                         userMessage.match(/(\d+(?:\.\d+)?)/);
      const loanAmount = amountMatch ? (amountMatch[1] || amountMatch[2] || amountMatch[0]) : null;
      
      parsedResponse.action = { 
        type: 'apply_loan',
        data: loanAmount ? { loanAmount: loanAmount } : undefined
      };
    }

    return parsedResponse;
  } catch (error) {
    console.error('Error calling Gemini AI:', error);
    return {
      message: 'I apologize, but I encountered an error. Please try again or check your API key configuration.',
    };
  }
}

