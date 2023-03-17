import { NextPage } from 'next';
import { CreateTodoDocument } from '@/graphql/generated/graphql';
import { useMutation } from 'urql';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Button,
  Center,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Text,
  Textarea,
  useToast,
  VStack,
} from '@chakra-ui/react';
import { createTodoSchema, CreateTodoSchema } from '@/types/create';
import { urqlClient } from '@/libs/urql';

const CreateTodo: NextPage = () => {
  const toast = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<CreateTodoSchema>({ resolver: yupResolver(createTodoSchema) });

  const onSubmit: SubmitHandler<CreateTodoSchema> = async (data) => {
    try {
      const client = await urqlClient();
      const variables = { title: data.title, detail: data.detail };
      await client.mutation(CreateTodoDocument, variables).toPromise();
      reset();
      toast({
        title: 'Todo Created',
        description: 'Todo was created in the database.',
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'top',
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Center h="calc(100vh - 60px)">
      <form onSubmit={handleSubmit(onSubmit)}>
        <VStack w={['80vw', '70vw', '50vw']} spacing={3}>
          <FormControl isInvalid={!!errors.title}>
            <FormLabel htmlFor="title">title</FormLabel>
            <Input
              type="text"
              id="title"
              placeholder="please enter title"
              isDisabled={isSubmitting}
              {...register('title')}
            />
            <FormErrorMessage>
              {errors.title && errors.title.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={!!errors.detail}>
            <FormLabel htmlFor="detail">Detail</FormLabel>
            <Textarea
              id="detail"
              placeholder="please enter detail"
              isDisabled={isSubmitting}
              {...register('detail')}
              resize="none"
            />
            <FormErrorMessage>
              {errors.detail && errors.detail.message}
            </FormErrorMessage>
          </FormControl>
          <Flex w="100%" justify="flex-end">
            <Button
              colorScheme="teal"
              type="submit"
              isLoading={isSubmitting}
              loadingText="Submitting"
              disabled={isSubmitting}
              w={['100%', '100%', '20%']}
              data-cy="submitButton"
            >
              <Text>Submit</Text>
            </Button>
          </Flex>
        </VStack>
      </form>
    </Center>
  );
};

export default CreateTodo;
