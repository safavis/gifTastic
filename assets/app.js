let input_text
let gif_array=[]


let topics=["animal","simpsons","friends"]
const initialize=_=>{
    for(let j=0;j<topics.length;j++)
    {   fetch(`https://api.giphy.com/v1/gifs/search?api_key=tv84Q8xD6XvKcYPAGgZwcDNFFduXZlM4&q=${topics[j]}&limit=25&offset=0&         rating=G&lang=en`)
             .then(r=>r.json())
             .then(({data})=>{
    
                    for(let i=0;i<10;i++)
                    {
                        let gif_div=document.createElement('div')
                        gif_div.className="gif_div_class"
                        gif_div.innerHTML=`<img src="${data[i].images.downsized.url}" alt="${topics[j]}">`
                        gif_div.setAttribute("data-name",`${topics[j]}`)
                        gif_div.setAttribute("data-indx",i)
                        gif_div.setAttribute("data-animated_url",`${data[i].images.downsized.url}`)
                        gif_div.setAttribute("data-still_url",`${data[i].images.downsized_still.url}`)
                        gif_div.setAttribute("data-toggle",true)
                        gif_array.push(gif_div)

                    }
                })
            .catch(e=>console.error(e))
    }
    display_button()
}

const display_button=_=>{
    document.querySelector(".button_header").innerHTML=``
    for(let i=0;i<topics.length;i++)
        {
            new_button=document.createElement('button')
            new_button.className="button_animal"
            new_button.setAttribute("data-name",`${topics[i]}`)
            new_button.textContent=`${topics[i]}`
            document.querySelector(".button_header").append(new_button)
           
        }
        
}
const display_gif=(gif_array_filter)=>{
    document.querySelector(".gifs").innerHTML=``
    for(let i=0;i<gif_array_filter.length;i++)
        {
            let uurrll
            if(gif_array_filter[i].toggle){
                uurrll=gif_array_filter[i].dataset.animated_url
            }
            else{
                uurrll=gif_array_filter[i].dataset.still_url
            }
            let gif_div=document.createElement('div')
            gif_div.className="gif_div_class"
            gif_div.setAttribute("data-indx",i)
            gif_div.innerHTML=`<img src="${uurrll}" alt="${gif_array_filter[i].name}">`
            document.querySelector(".gifs").append(gif_div)
           
        }
}

initialize()
document.addEventListener('click',({target})=>{
    if(target.className==="submit"){
        input_text=document.querySelector(".search_box").value
        document.querySelector(".search_box").value=''
        fetch(`https://api.giphy.com/v1/gifs/search?api_key=tv84Q8xD6XvKcYPAGgZwcDNFFduXZlM4&q=${input_text}&limit=25&offset=0&rating=G&lang=en`)
        .then(r=>r.json())
        .then(({data})=>{
            console.log(data)
            new_button=document.createElement('button')
            new_button.className="button_animal"
            new_button.setAttribute("data-name",`${input_text}`)
            new_button.textContent=`${input_text}`
            topics.push(input_text)
            document.querySelector(".button_header").append(new_button)
            document.querySelector(".gifs").innerHTML=``

            for(let i=0;i<10;i++)
            {
                let gif_div=document.createElement('div')
                gif_div.className="gif_div_class"
                gif_div.innerHTML=`<img src="${data[i].images.downsized.url}" alt="${input_text}">`
                gif_div.setAttribute("data-name",`${input_text}`)
                gif_div.setAttribute("data-indx",i)
                gif_div.setAttribute("data-animated_url",`${data[i].images.downsized.url}`)
                gif_div.setAttribute("data-still_url",`${data[i].images.downsized_still.url}`)
                gif_div.setAttribute("data-toggle",true)

                document.querySelector(".gifs").append(gif_div)
                gif_array.push(gif_div)

            }
        })
        .catch(e=>console.error(e))
       }
    
    if(target.className==="button_animal"){

        let button_name=target.dataset.name
        let  gif_array_filter=gif_array.filter(word=>{
            return word.dataset.name===button_name
        })
        console.log(gif_array_filter)

       display_gif(gif_array_filter)
            
    }
    console.log(target.className)
    if(target.className==="gif_div_class")
    {   
        let indx=gif_array.dataset.indx
        console.log(target.dataset.name)
        console.log(target.dataset.indx)
        gif_array.forEach(word=>{
            if (word.dataset.name===target.dataset.name && word.dataset.indx===target.dataset.indx)
            {word.dataset.toggle=!word.dataset.toggle
            target.dataset.toggle=!target.dataset.toggle}
        })
        display_gif()
    }
})