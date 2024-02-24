import './style.css';
import Checkbox from "./Checkbox";
import { Models } from "./models";
import { useState, useEffect } from 'react';

const Home = () => {
    const [isCheckAll, setIsCheckAll] = useState(false);
    const [isCheck, setIsCheck] = useState([]);
    const [list, setList] = useState([]);

    useEffect(() => {
        setList(Models);
    }, [list]);

    const handleSelectAll = e => {
        setIsCheckAll(!isCheckAll);
        setIsCheck(list.map(li => li.id));
        if (isCheckAll) {
            setIsCheck([]);
        }
    };

    const handleClick = e => {
        const {id, checked } = e.target;
        setIsCheck([...isCheck, id]);
        if (!checked) {
            setIsCheck(isCheck.filter(item => item !== id));
        }
    };

    const options = list.map(({id, name}) => {
        return (
            <div key = {id}>
                <Checkbox
                key = {id}
                type = "checkbox"
                name = {name}
                id = {id}
                handleClick = {handleClick}
                isChecked = {isCheck.includes(id)}
            />
            <label htmlFor={id}>{name}</label>
            </div>
        );
    });

    return <>
        <main>
            <div class="incontainer">
                <div class = "body_gradient">
                <h1>Sign of the Times</h1>
                <h2>Detecting Forged Signatures with Machine Learning</h2>
                <video width="720" height="480" controls>
                    <source src="" type="video/mp4"></source>
                    Your browser does not support the video tag.
                </video>
                <a href="#jump" class="button" id="try">Try it out!</a>
                </div>

                <div>
                <button type = "button" class = "button">Validate</button>
                <div id="bottom">
                    <Checkbox 
                    type = "checkbox"
                    name = "selectAll"
                    id = "selectAll"
                    handleClick = {handleSelectAll}
                    isChecked = {isCheckAll}
                    />
                    Select All
                    {options}
                    <p class = "textmargin">For more information about the models, click <a href = "about.html">here.</a></p>
                </div>
                </div>
            </div>
        </main>
    </>
}
export default Home;