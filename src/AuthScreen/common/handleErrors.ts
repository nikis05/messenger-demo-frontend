import { ApolloError } from '@apollo/client';
import { message as antdMessage } from 'antd';

export const handleErrors = <T extends string>(messages: T[]) => (
  error: ApolloError | undefined
) => {
  if (!error) return () => null;
  const matchedMessage = messages.find(
    message => error.message === `GraphQL error: ${message}`
  );
  if (!matchedMessage) antdMessage.error(error.message);
  return (message: T) => (message === matchedMessage ? message : null);
};
