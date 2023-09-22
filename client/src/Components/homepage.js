import React, { useState } from 'react'
import Axios from "axios"

const Homepage = () => {
    const [name, setName] = useState("")
    const [age, setAge] = useState()
    const [Phone, setPhone] = useState()
    const [Address, setAddress] = useState("")
    const [Salary, setSalary] = useState("")
    const [Designation, setDesignation] = useState("")

    const [userList, setUserList] = useState([])

    const onFormSubmit = () => {
        Axios.post("http://localhost:3001/createUser", {
            name: name,
            address: Address,
            phone: Phone,
            age: age,
            designation: Designation,
            salary: Salary
        }).then(() => {
            console.log("User is added...")
        })
    }

    const onGetUsers = () => {
        Axios.get("http://localhost:3001/getUsers").then((res) => {
            console.log(res)
            if (res.data.length > 0) {
                setUserList(res.data)
            }
            
        })
    }

    return (
        <div className='info-form'>
            <label>Full Name: </label>
            <input type='text' onChange={(e) => setName(e.target.value)} />
            <label>Address: </label>
            <input type='text' onChange={(e) => setAddress(e.target.value)} />
            <label>Phone number: </label>
            <input type='number' onChange={(e) => setPhone(e.target.value)} />
            <label>Age: </label>
            <input type='number' onChange={(e) => setAge(e.target.value)} />
            <label>Designation: </label>
            <input type='text' onChange={(e) => setDesignation(e.target.value)} />
            <label>Salary(year): </label>
            <input type='number' onChange={(e) => setSalary(e.target.value)} />
            <button onClick={onFormSubmit}>
                Save
            </button>

            <button onClick={onGetUsers}>
                Show User List
            </button>
            <div>
                {userList.map((user, id) => {
                    return (
                        <p key={id}>{user.name} are employed in our company with salary {user.salary} per year</p>
                    )
                })}
            </div>
        </div>
    )
}

export default Homepage