//Thứ các bước làm việc với Redux
/* 
    State
    Reducer
    Store
*/
const {createStore} = window.Redux;

// const data = JSON.parse(localStorage.getItem('hobbys'));

// tạo state
const initialState =  JSON.parse(localStorage.getItem('hobbys')) || [];

//tạo reducer
const hoopyReducer = (state = initialState,action) =>{
    switch (action.type){
        case 'ADD_HOPPY':{
            //luôn phải tạo ra 1 state mới vì không tạo sẽ bị dính tham chiếu (trùng ô nhớ)
            const newList = [...state];
            newList.push(action.payload);
            
            return newList;
        }
        default:
            return state;

    }
    
};

// tạo Store
const store = createStore(hoopyReducer);


// RENDER REDUX FOR HOPPY LIST
const renderHoppyList = (hoppylist) =>{
    //kiem tra hoppylist
    if (!Array.isArray(hoppylist) || hoppylist.lenght ===0) {
        return;
    }

    // get thẻ ul 
    const ulElement = document.querySelector('#HobbylistID');
    if (!ulElement) return;

    //xóa lần render gần nhất để khỏi bị đè.
    ulElement.innerHTML = '';

    //duyệt qua từng phần tử củng mảng hoppylist
    for (const hoppy of hoppylist) {
        const liElement = document.createElement('li');
        // liElement.classList.add('list-group-item list-group-item-action');
        liElement.setAttribute('class','list-group-item list-group-item-action');
        liElement.innerText = hoppy;

        ulElement.appendChild(liElement);
    }
}

//RENDER INITIAL HOPPY LIST, tại vì Store của mình chỉ đang có 1 state duy nhất, nên không cần phải . tới state con.
const initialHoppyList = store.getState();

// // // Gọi hàm để render hoppylist
renderHoppyList(initialHoppyList);


//Handle Form Submit, phải lấy được cái form nó ra
const hoppyForm = document.querySelector('.hobbyFormID');

if (hoppyForm){
    onSubmitForm =  (event) =>{
        event.preventDefault()
        const hoppyText = hoppyForm.querySelector('.hobbyTextID');

        if (!hoppyText) return;

        // console.log(hoppyText.value);

        //Để dispatch 1 action thì cần phải tạo ra action
        const action = {
            type:'ADD_HOPPY',
            payload: hoppyText.value
        };

        //gọi 1 action để dispatch lên trên store -> gọi reducer để xử lý
        store.dispatch(action);

        //reset form
        hoppyForm.reset();
    };
    
    hoppyForm.addEventListener('submit', onSubmitForm);
}

//Store.subscribe(listener) — Để nhận thấy bất kỳ thay đổi nào trong state. Nó sẽ được gọi mỗi khi một action được gửi đi.
store.subscribe(()=>{
    // console.log('STATE_UPDATE',store.getState());

    // khi thấy có state thay đổi thì subscribe phát hiện và gọi lên store
    const newListHobby = store.getState();
    renderHoppyList(newListHobby);


    localStorage.setItem('hobbys',JSON.stringify(newListHobby));
})





// console.log(window.Redux);
// console.log(initialState);