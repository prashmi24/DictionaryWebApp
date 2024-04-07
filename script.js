const input = document.querySelector('input');
        const btn = document.querySelector('button');
        const card = document.querySelector('.main-card');

        async function searchWord(word){
            try {
                const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
                const data = await res.json();
                return data[0];
            } catch (error) {
                console.error("Error fetching data:", error);
                return null;
            }
        }

        btn.addEventListener('click', showData);

        async function showData(){
            const data = await searchWord(input.value);
            console.log(data);

            if (!data) {
                card.innerHTML = `<div>No data found</div>`;
                return;
            }

            let partOfSpeechArray = [];
            for(let i = 0; i < data.meanings.length; i++){
                partOfSpeechArray.push(data.meanings[i].partOfSpeech);
            }

            card.innerHTML = `
         
                <div class="card">
                    <div class="property">
                        <span>Phonetics:</span> 
                        <span>${data.phonetic || '-'}</span>              
                    </div>
                    <div class="property">
                        
                        <audio controls>
                                <source src="${data.phonetics && data.phonetics[0] ? data.phonetics[0].audio : ''}" type="audio/mpeg">
                                Your browser does not support the audio element.
                            </audio>           
                    </div>
                    <div class="property">
                        <span>Definition:</span> 
                        <span>${data.meanings[0].definitions[0].definition || '-'}</span>              
                    </div>
                    <div class="property">
                        <span>Example:</span>  
                        <span>${data.meanings[0].definitions[0].example || '-'}</span>             
                    </div>
                    <div class="property">
                        <span>Parts of Speech:</span> 
                        <span>${partOfSpeechArray.join(', ')}</span>              
                    </div>
                </div>
    
            `;
        }

        card.addEventListener('click', function(event) {
            if (event.target.tagName === 'AUDIO') {
                event.target.play();
            }
        });