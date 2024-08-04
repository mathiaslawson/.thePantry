import { NextRequest, NextResponse } from 'next/server';
import LlamaAI from 'llamaai';

const apiToken = process.env.AIML_API_KEY;
const llamaAPI = new LlamaAI(apiToken);

export async function POST(req: NextRequest) {
  try {
    const apiRequestJson = {
      messages: [{ role: 'user', content: 'What is the weather like in Boston?' }],
      functions: [
        {
          name: 'get_current_weather',
          description: 'Get the current weather in a given location',
          parameters: {
            type: 'object',
            properties: {
              location: {
                type: 'string',
                description: 'The city and state, e.g. San Francisco, CA',
              },
              days: {
                type: 'number',
                description: 'For how many days ahead you want the forecast',
              },
              unit: { type: 'string', enum: ['celsius', 'fahrenheit'] },
            },
          },
          required: ['location', 'days'],
        },
      ],
      stream: false,
      function_call: 'get_current_weather',
    };

    const response = await llamaAPI.run(apiRequestJson);
    return NextResponse.json(response);
  } catch (error) {
    console.error(error);
    return NextResponse.error();
  }
}
