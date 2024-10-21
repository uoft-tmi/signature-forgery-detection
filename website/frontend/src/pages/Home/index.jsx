import '../shared.css';
import Checkbox from "./Checkbox";
import { Models } from "./models";
import { useState, useRef, useMemo, useEffect } from 'react';
import { Link } from "react-router-dom";

const Home = () => {
    const modelMapping = {
        "decisionTree": 1,
        "knn": 2,
        "cnn": 3
    };  

    const [tableData, setTableData] = useState([]);
    const [columns, setColumns] = useState([
        { key: 'image', label: 'Image', visible: true },
        { key: 'decisionTree', label: 'Decision Tree', visible: false },
        { key: 'knn', label: 'KNN', visible: false },
        { key: 'cnn', label: 'CNN', visible: false }
    ]);
    
    const [isCheckAll, setIsCheckAll] = useState(false);
    const [isCheck, setIsCheck] = useState([]);
    const [selectedFile, setSelectedFile] = useState(null);  // Store the file for uploading
    const [previewImage, setPreviewImage] = useState(null);
    const [isButtonClicked, setIsButtonClicked] = useState(false);

    const hiddenFileInput = useRef(null);
    const scrollRef = useRef(null);

    async function query(formData) {
        try {
            const response = await fetch(
                "http://ec2-3-145-78-113.us-east-2.compute.amazonaws.com/sfmodels/predict/",
                {
                    method: "POST",
                    body: formData,
                }
            );
    
            if (!response.ok) {
                throw new Error(`API request failed with status ${response.status}`);
            }
    
            const result = await response.json();
            return result;
        } catch (error) {
            console.error("Error during API request:", error);
            return null;
        }
    }

    const handleSelectAll = (e) => {
        const isChecked = e.target.checked;

        setIsCheckAll(isChecked);
        setIsCheck(isChecked ? Models.map(model => model.id) : []);

        setColumns(prevColumns => prevColumns.map(column =>
            column.key !== 'image' ? { ...column, visible: isChecked } : column
        ));
    };

    const handleClick = (e) => {
        const { id, checked } = e.target;

        setIsCheck(prevCheck => checked
            ? [...prevCheck, id]
            : prevCheck.filter(item => item !== id)
        );
    
        setColumns(prevColumns => prevColumns.map(column =>
            column.key.toLowerCase() === id.toLowerCase()
                ? { ...column, visible: checked }
                : column
        ));
    };

    const handleDragOver = (event) => {
        event.preventDefault();
    }

    const handleDrop = (event) => {
        event.preventDefault();
        const file = event.dataTransfer.files[0];
        if (file) {
            setSelectedFile(file);
            setPreviewImage(URL.createObjectURL(file));
        }
    }

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedFile(file);
            setPreviewImage(URL.createObjectURL(file));
        }
    }

    const openFileInput = () => {
        hiddenFileInput.current.click();
    }

    const handleClickScroll = () => {
        scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
    }

    const handleValidate = async () => {
        if (!selectedFile) {
            alert("Please upload an image before validation.");
            return;
        }

        setIsButtonClicked(true);

        const selectedModels = isCheck.map(id => modelMapping[id]); // Get the model numbers
        const selectedModelsJSON = JSON.stringify(selectedModels);
    
        const formData = new FormData();
        formData.append("file", selectedFile);  // Append the selected image to the form data
        formData.append("models", selectedModelsJSON);  // Append selected models

        // Make the API call
        const result = await query(formData);

        // Processing API response
        if (result != null) {
            const newRow = {
                id: tableData.length + 1,
                image: <img src={previewImage} alt="Uploaded" width="100" />,
                decisionTree: result.predictions["Decision Tree"]
                    ? (Math.round(result.predictions["Decision Tree"][0]) === 1 ? "Real Signature" : "Forgery")
                    : 'N/A',
                knn: result.predictions["KNN"]
                    ? (Math.round(result.predictions["KNN"][0]) === 1 ? "Real Signature" : "Forgery")
                    : 'N/A',
                cnn: result.predictions["CNN"]
                    ? (Math.round(result.predictions["CNN"][0]) === 1 ? "Real Signature" : "Forgery")
                    : 'N/A'
            };
    
            setTableData(prevData => [...prevData, newRow]);
        }
    };

    // Calculate options dynamically based on modelList and isCheck
    const options = useMemo(() => {
        return Models.map(({ id, name }) => (
            <div key={`${id}-container`} className='checkbox-container'>
                <Checkbox
                    type="checkbox"
                    name={name}
                    id={id}
                    handleClick={handleClick}
                    isChecked={isCheck.includes(id)}
                />
                <label htmlFor={id}>{name}</label>
            </div>
        ));
    }, [isCheck]);

    return (
        <>
            <main>
                <div className="incontainer">
                    <div className="body_gradient">
                        <h1 className="body_title">Sign of the Times</h1>
                        
                        <div className="loading">
                            loading
                        </div>
                        
                        <h2 id='title'>Detecting Forged Signatures with Machine Learning</h2>
                        <video width="720" height="480" controls>
                            <source src="" type="video/mp4"></source>
                            Your browser does not support the video tag.
                        </video>
                        <button type="button" className="button" id="try" onClick={handleClickScroll}>Try it out!</button>
                        <div id='jump' ref={scrollRef}>
                            <div id='left-div'>
                                <div
                                    id='preview-container'
                                    onDragOver={handleDragOver}
                                    onDrop={handleDrop}
                                    onClick={openFileInput}
                                >
                                    {previewImage ? (
                                        <img src={previewImage} id='preview' alt='Preview'></img>
                                    ) : (
                                        <>
                                            <div id='dragndrop-container'>
                                                <img src='drag-and-drop-icon.png' alt='Drag and drop' id='dragndrop-image'></img>
                                            </div>
                                            <p id='dragndrop'>Drag & Drop or Browse</p>
                                        </>
                                    )}
                                    <input 
                                        type='file' 
                                        style={{ display: 'none' }}
                                        onChange={handleFileChange}
                                        ref={hiddenFileInput}
                                    />
                                </div>
                                <button type="button" className="button" onClick={handleValidate}>Validate</button>
                            </div>
                            <div id='right-div'>
                                <p>Upload an image of a signature and click the models you want to try</p>
                                <div id='checkboxes-container'>
                                    <div className='checkbox-container'>
                                        <Checkbox 
                                            type="checkbox"
                                            name="selectAll"
                                            id="selectAll"
                                            handleClick={handleSelectAll}
                                            isChecked={isCheckAll}
                                        />
                                        Select All
                                    </div>
                                    {options}
                                    {isButtonClicked && (
                                        <table>
                                            <thead>
                                                <tr>
                                                    {columns.filter(column => column.visible).map(column => (
                                                        <th key={`${column.key}-row`}>{column.label}</th>
                                                    ))}
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {tableData.map(row => (
                                                    <tr key={row.id}>
                                                        {columns
                                                            .filter(column => column.visible)
                                                            .map(column => (
                                                                <td key={column.key}>{row[column.key]}</td>
                                                            ))}
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    )}
                                </div>
                                <p className="textmargin">For more information about the models, click <Link to="/about#models">here</Link></p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}

export default Home;
