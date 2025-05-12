/* In questo esercizio, utilizzerai async/await per creare la funzione getChefBirthday(id). Questa funzione accetta un id di una ricetta e deve:
Recuperare la ricetta da https://dummyjson.com/recipes/{id}
Estrarre la proprietà userId dalla ricetta
Usare userId per ottenere le informazioni dello chef da https://dummyjson.com/users/{userId}
Restituire la data di nascita dello chef*/

/*Attualmente, se la prima richiesta non trova una ricetta, la seconda richiesta potrebbe comunque essere eseguita causando errori a cascata.
Modifica getChefBirthday(id) per intercettare eventuali errori prima di fare la seconda richiesta. */

/*Utilizza la libreria dayjs per formattare la data di nascita nel formato giorno/mese/anno. */





async function getChefBirthday(id) {
     let ricetta;
    try {
        ricettaResponse = await fetch(`https://dummyjson.com/recipes/${id}`);
        ricetta = await ricettaResponse.json();
    }
    catch (error) {
        console.error( error);
        throw new Error("Ricetta non trovata");
    }

    if (ricetta.message) {
        console.error(ricetta.message);
        
    }

  
 let chef;   
  try {
        chefResponse = await fetch(`https://dummyjson.com/users/${ricetta.userId}`);
        chef = await chefResponse.json();
    }catch (error) {
        console.error( error);
        throw new Error("Chef non trovato");
    }

    if (chef.message) {
        console.error(chef.message);
        
    }

    if (!chef.birthDate) {
        throw new Error("Data di nascita non trovata");
    }
 
   const dataFormattata = dayjs(chef.birthDate).format("DD/MM/YYYY");
    
  return dataFormattata;
  
}

(async () => {
    try{
        const compleanno = await getChefBirthday(37777);
   console.log("La data di nascita è :", compleanno);
    }catch (error) {
        console.error("Error", error);
    }finally{
        console.log("Fine");
    }
  
})();