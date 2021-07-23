import { ApolloClient, InMemoryCache } from "@apollo/client";
import Config from '../app_config'
console.log(Config.get_config().MY_GQL_URL)

//     uri: 'http://localhost:4000/graphql',
const client = new ApolloClient({
    uri: Config.get_config().MY_GQL_URL,
    cache: new InMemoryCache(),
});
//setClient(client);

export default client;
