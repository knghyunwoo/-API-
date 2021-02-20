import React from 'react';
import axios from 'axios';

class Cafes extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            result: [], // 불러오기 버튼 실행시 자료 담는 state
            id: 0, // 여기부터 밑에 4개는 등록할때 사용하는 state
            item: null,
            description: "",
            price: 0,
            searchId: 0,  //찾으실 ID 담는 state
            searchResult: [] //찾으실 ID를 찾아서 그거에 맞는 값만 넣는 state
        };
    }
    
    //불러오기 버튼 누르면 실행되는 함수
    handleGet = e => {
        const url = `https://${window.location.hostname}:8190/data`
        axios.get(url)
        .then(response => {
            // console.log(response.data)
            this.setState({ result: response.data })
            })
    }
    
    //ID input에 입력하면 실행되는 함수
    registerID = e => { 
        this.setState({ id: Number(e.target.value) });
    }
    //메뉴 이름 input에 입력하면 실행되는 함수
    registerItem = e => { 
        this.setState({ item: e.target.value }); 
    }
    //설명 input에 입력하면 실행되는 함수
    registerDesc = e => { 
        this.setState({ description: e.target.value }); 
    }
    //가격 input에 입력하면 실행되는 함수
    registerPrice = e => { 
        this.setState({ price: Number(e.target.value) }); 
    }
    //찾으실 ID input에 입력하면 실행되는 함수
    getID = e => { 
        this.setState({ searchId: Number(e.target.value) }); 
    }
    //등록하기 버튼 누르면 실행되는 함수
    handleRegister = e => {
        const url = `https://${window.location.hostname}:8190/data`
        var data =  { "id": this.state.id, "item": this.state.item, "description": this.state.description, "price": this.state.price}
        // console.log(data)
        axios.post(url, data)
    }
    //검색하기 버튼 누르면 실행되는 함수
    handleFind = e => {
        const url = `https://${window.location.hostname}:8190/data`
         axios.get(url)
        .then(response => {
            // console.log(response.data[0])
            for (var i = 0; i < response.data.length; i++) {
                if (response.data[i].id == this.state.searchId) {
                    this.setState({ searchResult: response.data[i].item + "  Price:  " + response.data[i].price + "  Description :  " + response.data[i].description})
                    break
                }
                else {
                    this.setState({ searchResult: "제대로된 아이디를 입력해주세요"})
                }
            }
            // console.log(this.state.searchResult)
            })
    }
    
    render() {
        const { result } = this.state;
        const menu = result.map((todo, index) => 
            <li key={index}>
                {todo.id}. {todo.item} : {todo.price} , {todo.description}
            </li>
        );
        return (
            <div>
                <div>
                    {menu}
                </div><br/>
                <button onClick={this.handleGet}> 불러오기 </button><br/><br/>
                <input onChange={this.registerID} placeholder="ID"/>
                <input onChange={this.registerItem} placeholder="메뉴 이름"/>
                <input onChange={this.registerDesc} placeholder="설명"/>
                <input onChange={this.registerPrice} placeholder="가격"/><br/><br/>
                <button onClick={this.handleRegister}> 등록하기 </button><br/><br/>
                <input onChange={this.getID} placeholder="찾으실 ID"/>
                <button onClick={this.handleFind}> 검색하기 </button><br/><br/>
                <div>
                    {this.state.searchResult}
                </div>
                <br/>
            </div>
        );
    }
}

export default Cafes;
