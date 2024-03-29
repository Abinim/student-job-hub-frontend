import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Box,
  Text,
  Flex,
  Link as ChakraLink,
} from '@chakra-ui/react';
import { login } from '../api/auth.api';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useContext } from 'react';
import { AuthContext } from '../context/auth.context';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const { storeToken, authenticateUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();

    const user = { email, password };

    try {
      const response = await login(user);

      storeToken(response.data.authToken);
      authenticateUser();
      navigate('/');
    } catch (error) {
      console.log('error login', error.response.data.message);
      setError(error.response.data.message);
    }
  };

  return (
    <Flex
      align='center'
      justify='center'
      minH='100vh'
      bg='gray.50'
      px={{ base: '4', md: '8' }}
    >
      <Box
        maxW='400px'
        mx='auto'
        borderWidth='1px'
        borderRadius='20'
        overflow='hidden'
        p='20px'
        boxShadow='lg'
        margin='auto'
        mt='200px'
        bg='gray.100'
        backgroundColor='#f9f9f9'
      >
        <FormLabel color='black'> Login </FormLabel>
        <form onSubmit={handleSubmit}>
          {/* Add error message display */}
          {error && (
            <Text color='red' mb={4}>
              {error}
            </Text>
          )}
          <FormControl isRequired>
            <FormLabel color='black'>Email</FormLabel>
            <Input
              type='email'
              name='email'
              value={email}
              onChange={({ target }) => setEmail(target.value)}
              placeholder='Email'
              style={{ height: '30px', width: '200px' }}
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel color='black'>Password</FormLabel>
            <Input
              type='password'
              name='password'
              value={password}
              onChange={({ target }) => setPassword(target.value)}
              placeholder='Password'
              style={{ height: '30px', width: '200px' }}
            />
          </FormControl>
          <Button type='submit' mt={4} colorScheme='teal'>
            Login
          </Button>
        </form>

        <Text textAlign='center' color='black' mt='20px'>
          If you don't have an account yet, click on "Sign Up" to create one.{' '}
          <ChakraLink as={Link} to='/signup' color='teal'>
            Sign Up
          </ChakraLink>
        </Text>
      </Box>
    </Flex>
  );
};

export default Login;
