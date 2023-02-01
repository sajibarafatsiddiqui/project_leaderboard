import './style.css';
import axios from "axios"


const baseUrl = "https://us-central1-js-capstone-backend.cloudfunctions.net/api/"

const generateId= async () =>{
    let endpoint = "games/"
    let gameName = "leadership"
    const data = { "name" : gameName}
try { 
    const res = await axios.post(baseUrl+endpoint,data)
    const result = await res.data['result']
    const id = result.split(':')[1].trim().split(' ')[0]
    return id
    
}catch (error) {
    console.error('There was an error!', error);
   }

}

const apiCall = async (sentName,sentScore) =>{
let getId = JSON.parse(localStorage.getItem('id')) 
if (!getId){
    getId = await generateId()
    localStorage.setItem('id',JSON.stringify(getId))
    
}

const endpoint =await "games/"+getId+"/scores/"   
const postData ={"user":sentName,"score":sentScore}
   try{ 
   let res = await axios.post(baseUrl+endpoint,postData)

   } catch (error) {
    console.error('There was an error!', error);
   }
}

const sentData = (e) => {
    e.preventDefault();

    const name = document.getElementById('name')
    const score= document.getElementById('score')
    
    const sentName = name.value
    const sentScore = score.value
    apiCall(sentName,sentScore)
    name.value = ''
    score.value=''

}
const sendButton = document.getElementById("send-btn")
sendButton.addEventListener('click',sentData)

const showData= (arr)=> {
localStorage.setItem('leads',JSON.stringify(arr))
const lbContainer = document.getElementById('leaderboard')
lbContainer.innerHTML=''
arr.forEach(elm =>{
    const lead = document.createElement('li')
    lead.innerHTML = `${elm.user}  :  ${elm.score}`
    lbContainer.appendChild(lead)
})
}
const getData = async (e) => {
    e.preventDefault();
    let getId = JSON.parse(localStorage.getItem('id')) 
if (!getId){
    getId = await generateId()
    localStorage.setItem('id',JSON.stringify(getId))
}
const endpoint =await "games/"+getId+"/scores/"
try{ 
    let res = await axios.get(baseUrl+endpoint)
    showData(res.data['result'])
 
    } catch (error) {
     console.error('There was an error!', error);
    }
}

const refreshButton = document.getElementById("get-btn")
refreshButton.addEventListener('click',getData)

showData(JSON.parse(localStorage.getItem('leads')))