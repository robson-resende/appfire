import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';
import { FormUsers } from './src/FormUsers';
import { auth } from './src/firebaseConnection';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth';

export default function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [authUser, setAuthUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const unsub = onAuthStateChanged(auth, (user) => {
      if(user){
        setAuthUser({
          email: user.email,
          uid: user.uid
        })

        setLoading(false);
        return;
      }

      setAuthUser(null);
      setLoading(false);

    });

  }, []);

  async function handleCreateUser(){
    const user = await createUserWithEmailAndPassword(auth, email, password);
    console.log(user);
  }

  function handleLogin(){
    signInWithEmailAndPassword(auth, email, password)
    .then((user) => {
      console.log(user);

      setAuthUser({
        email: user.user.email,
        uid: user.user.uid
      })
    })
    .catch(err => {
      if(err.code === "auth/missing-password"){
        console.log("A senha é obrigatória!");
      }

      console.log(err.code);
    })
  }

  async function handleLogout(){
    await signOut(auth);

    setAuthUser(null);
  }

  if(authUser){
    return(
      <View style={styles.container}>
        <FormUsers/>
      </View>
    )
  }

  return (
    <View style={styles.container}>

      {loading && <Text style={{ fontSize: 20, marginLeft: 8, color: "#000" }}>Carregando informações...</Text>}

      <Text style={{ marginLeft: 8, fontSize: 18, color: "#000"}}>Email:</Text>
      <TextInput 
      style={styles.input} 
      placeholder="Digite seu email..." 
      value={email} 
      onChangeText={(text) => setEmail(text)}
      />

      <Text style={{ marginLeft: 8, fontSize: 18, color: "#000"}}>Senha:</Text>
      <TextInput 
      style={styles.input} 
      placeholder="Digite sua senha..." 
      value={password} 
      onChangeText={(text) => setPassword(text)}
      secureTextEntry={true}
      />

      <TouchableOpacity style={[styles.button, { marginBottom: 8}]} onPress={handleLogin}>
        <Text style={styles.buttonText}>Fazer login</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, { marginBottom: 8}]} onPress={handleCreateUser}>
        <Text style={styles.buttonText}>Criar uma conta</Text>
      </TouchableOpacity>

      {authUser && (
        <TouchableOpacity style={[styles.button, { backgroundColor: "red"}]} onPress={handleLogout}>
          <Text style={styles.buttonText}>Sair da conta</Text>
        </TouchableOpacity>
      )}

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40
  },
  input:{
    marginLeft: 8,
    marginRight: 8,
    borderWidth: 1,
    marginBottom: 14
  },
  button:{
    backgroundColor: "#000",
    marginLeft: 8,
    marginRight: 8,
    padding: 8
  },
  buttonText:{
    color: "#fff",
    textAlign: 'center'
  }
});
