import './style.css'
import Checkbox from "./Checkbox";
import { Models } from "./models";
import { useState, useRef, useEffect } from 'react';
import { Link } from "react-router-dom";

const Home = () => {
    const [isCheckAll, setIsCheckAll] = useState(false);
    const [isCheck, setIsCheck] = useState([]);
    const [list, setList] = useState([]);

    const [previewImage, setPreviewImage] = useState(null);
    const hiddenFileInput = useRef(null);
    const scrollRef = useRef(null);

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

    const handleDragOver = (event) => {
        event.preventDefault();
    }
  
    const handleDrop = (event) => {
        event.preventDefault();
        const file = event.dataTransfer.files[0];
        if (file) {
            setPreviewImage(URL.createObjectURL(file));
        }
    }

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setPreviewImage(URL.createObjectURL(file));
        }
    }

    const openFileInput = () => {
        hiddenFileInput.current.click()
    }

    const handleClickScroll = () => {
        scrollRef.current?.scrollIntoView({behavior: 'smooth'});
    }

    return <>
        <main>
            <div className="incontainer">
                <div className = "body_gradient">
                <h1>Sign of the Times</h1>
                <h2 id='title'>Detecting Forged Signatures with Machine Learning</h2>
                <p id='intro'>Intro</p>
                <video width="720" height="480" controls>
                    <source src="" type="video/mp4"></source>
                    Your browser does not support the video tag.
                </video>
                <button type = "button" className="button" id="try" onClick={handleClickScroll}>Try it out!</button>
                </div>
                <div id='jump' ref={scrollRef}>
                    <div id='left-div'>
                        <div
                            id='preview-container'
                            onDragOver={handleDragOver}
                            onDrop={handleDrop}
                            onClick={openFileInput}>
                            {previewImage ? 
                            (
                                <img src={previewImage} id='preview' alt='Preview'></img>
                            ) :
                            (
                                <>
                                    <div id='dragndrop-container'>
                                        <img src='drag-and-drop-icon.png' alt='Drag and drop' id='dragndrop-image'></img>
                                    </div>
                                    <p id='dragndrop'>Drag & Drop or Browse</p>
                                </>
                            )}
                            <input 
                                type='file' 
                                style={{display: 'none'}}
                                onChange={handleFileChange}
                                ref={hiddenFileInput}></input>
                        </div>
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
                        </div>
                    </div>

                    <div id='right-div'>
                        <p>**Instructions**</p>
                        <div id='checkboxes-container'>
                            <label>
                                <input type = "checkbox" className = "checkboxes" /> <span>Model 1</span>
                            </label>
                            <label>
                                <input type = "checkbox" className = "checkboxes" /> <span>Model 2</span>
                            </label>
                            <label>
                                <input type = "checkbox" className = "checkboxes" /> <span>Select All</span>
                            </label>
                        </div>
                        <p className = "textmargin">For more information about the models, click <Link to = "/about">here.</Link></p>
                    </div>
                </div>
            </div>
        </main>
    </>
}
export default Home;