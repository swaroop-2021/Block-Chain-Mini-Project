// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.4.21 <=0.9.0;

contract userStorage {
    struct User {
        uint id;
        string name;
        string job;
        uint age;
        string password;
        uint [] createdCases;
        uint [] onChainCases;
    }

    mapping(uint=>User) users;
    uint public nextId = 1;



    function create(string memory _name, string memory _job, uint _age,string memory _password) public {
        uint [] memory array1;
        users[nextId]=User(nextId, _name, _job, _age, _password,array1,array1);
        nextId++;
    }

    function readName(uint _id) public view returns(string memory) {
        if(_id>0 && users[_id].id==_id){
            return(users[_id].name);
        }
        else{
            return ("null");
        }
    }
    
    function readJob(uint _id) public view returns(string memory) {
        if(_id>0 && users[_id].id==_id){
            return(users[_id].job);
        }
        else{
            return("null");
        }
    }
    
    function readAge(uint _id) public view returns(uint) {
        if(_id>0 && users[_id].id==_id){
            return(users[_id].age);
        }
        else{
            // return ("null");
        }
    }

    function createCase(uint _id,uint _caseId) public{
        if(_id>0 && users[_id].id==_id){
            if(_caseId>0){
                users[_id].createdCases.push(_caseId);
            }
        }
        else{
            // return ("null");
        }
    }

    function appendIntoChain(uint _ownerId,uint _userId,uint _caseId) public{
        if(_ownerId>0 && users[_ownerId].id==_ownerId){
            
            if(_userId>0 && users[_userId].id==_userId){
                if(_caseId>0){
                    users[_userId].onChainCases.push(_caseId);
                }
            }
            else{
                // return("User ID is invalid");
            }
        }
        else{
            // return ("Owner ID is Invalid");
        }
    }

    function updateName(uint _id, string memory _name) public {
        users[_id - 1].name = _name;
    }

    function updateJob(uint _id, string memory _job) public {
        users[_id - 1].job = _job;
    }

    function updateAge(uint _id, uint _age) public {
        users[_id - 1].age = _age;
    }

    function updateAllInfo(uint _id, string memory _name, string memory _job, uint _age) public {
        users[_id - 1].name = _name;
        users[_id - 1].job = _job;
        users[_id - 1].age = _age;
    }

    function remove(uint _id) public {
        delete users[_id - 1];
    }
}