import { Context, APIGatewayProxyResult, APIGatewayEvent } from 'aws-lambda';
import { updateScheduleHandler } from './handlers';

const supportedEvents: Map<string, () => Promise<void>> = new Map([
    ['updateSchedule', updateScheduleHandler],
]);

type APIGatewayEventWithAction = APIGatewayEvent & { action: string };

export const handler = async (
    event: APIGatewayEventWithAction,
    context: Context
): Promise<APIGatewayProxyResult> => {
    console.log(`Event: ${JSON.stringify(event, null, 2)}`);
    console.log(`Context: ${JSON.stringify(context, null, 2)}`);

    const action = event?.action;
    if (!action) {
        return {
            statusCode: 400,
            body: JSON.stringify({
                message: 'No action parameter was provided on the event',
            }),
        };
    }

    const handler = supportedEvents.get(event.action);
    if (!handler) {
        return {
            statusCode: 400,
            body: JSON.stringify({
                message: `Unsupported action parameter provided on the event: ${action}`,
            }),
        };
    }

    try {
        await handler();
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({
                message:
                    'Unexpected error while executing the handler function',
                error,
            }),
        };
    }

    return {
        statusCode: 200,
        body: JSON.stringify({ message: 'Success!' }),
    };
};
