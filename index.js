//thứ tự xây dựng
/*  
    state
    reducer
    store
    render
    subscribe
*/ 
const {createStore} = window.Redux;

const data = JSON.parse(localStorage.getItem('hobbys'));

const initialState = data ? data : [];

// console.log(initialState);

const hobbyReducer = (state = initialState, action)=>{
    switch(action.type){
        case 'ADD_HOBBY':{
            //luôn phải tạo ra 1 state mới vì không tạo sẽ bị dính tham chiếu (trùng ô nhớ)
            const newState = [...state]
            newState.push(action.payload);

            return newState;
        }
        default :
            return state    
    }
};

const store = createStore(hobbyReducer);

const hobbyRender = (hobbyList)=>{

    if(!Array.isArray(hobbyList) || hobbyList.length ===0) return;

    // Xóa lần render lần nhất cho thẻ Ul để khỏi bị lặp
    const ulElement = document.getElementById('HobbylistID');
    ulElement.innerHTML = '';

    //kiểm tra ul
    if(!ulElement) return;

    for (const hobbyitem of hobbyList) {
        const liElement = document.createElement('li');

        liElement.innerText = hobbyitem;
        liElement.setAttribute('class','list-group-item list-group-item-action');
        ulElement.appendChild(liElement);

    }

    // console.log(initialState);
};

// console.log(window.Redux);
//tạo 1 biết để get state 
const initialHoppyList = store.getState();

hobbyRender(initialHoppyList);

//get element fomr
 const formElement = document.querySelector('.hobbyFormID');

if (formElement) {
    
    //viết sự kiện xử lý form 
    const onSubmitForm = (event) =>{
        event.preventDefault();

        //thêm hobby khi nhập vào input
        const textelement = formElement.querySelector('.hobbyTextID');
        if(!textelement) return;

        //tạo action là 1 object
        const action = {
            type:'ADD_HOBBY',
            payload: textelement.value
        }
        
        //tạo action xong thì sẽ dispatch action đó lên store
        store.dispatch(action);

        //xóa input
        formElement.reset();

    };

    formElement.addEventListener('submit',onSubmitForm);
}


//sau tạo sử lý xự kiện, tạo 1 phương thức tự động là subscribe để, tựu động nhận thấy state thay đổi sẽ getState và render lại
store.subscribe(()=>{
    //tạo 1 biết để get state 
    const newHoppyList = store.getState();
    
    hobbyRender(newHoppyList);

    //sau khi render xong thì sẽ lưu vào localstorage
    localStorage.setItem('hobbys',JSON.stringify(newHoppyList));
})