/* In questo esercizio, utilizzerai async/await per creare la funzione getChefBirthday(id). Questa funzione accetta un id di una ricetta e deve:
Recuperare la ricetta da https://dummyjson.com/recipes/{id}
Estrarre la proprietà userId dalla ricetta
Usare userId per ottenere le informazioni dello chef da https://dummyjson.com/users/{userId}
Restituire la data di nascita dello chef*/

/*Attualmente, se la prima richiesta non trova una ricetta, la seconda richiesta potrebbe comunque essere eseguita causando errori a cascata.
Modifica getChefBirthday(id) per intercettare eventuali errori prima di fare la seconda richiesta. */

/*Utilizza la libreria dayjs per formattare la data di nascita nel formato giorno/mese/anno. */


async function getRecipe(url) {
  const response = await fetch(url);

  const data = await response.json();
  return data;
}


async function getChefBirthday(id) {

    const ricetta = await getRecipe(`https://dummyjson.com/recipes/${id}`);

    if (!ricetta || !ricetta.userId) {
        throw new Error("Ricetta non trovata ");
    }

  
 
 
  const chef = await getRecipe(`https://dummyjson.com/users/${ricetta.userId}`);
  return chef.birthDate;
  
}

(async () => {
    try{
        const compleanno = await getChefBirthday(3);
   console.log("La data di nascita è :",dayjs(compleanno).format("DD/MM/YYYY"));
    }catch (error) {
        console.error("Error", error);
    }finally{
        console.log("Fine");
    }
  
})();