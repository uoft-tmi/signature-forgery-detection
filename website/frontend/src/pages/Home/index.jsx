import '../shared.css'
import Checkbox from "./Checkbox";
import { Models } from "./models";
import { useState, useRef, useEffect } from 'react';
import { Link } from "react-router-dom";
<<<<<<< HEAD
import { FaInfoCircle } from 'react-icons/fa';
=======
import { useNavigate } from 'react-router-dom';
>>>>>>> c28badb050c6f089c1c29ea494026040a97f0266

const Home = () => {
    const navigate = useNavigate();

    async function query(data) {
        const response = await fetch(
            "https://api-inference.huggingface.co/models/gpt2",
            {
                headers: { Authorization: `Bearer ${'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'}` },
                method: "POST",
                body: JSON.stringify(data),
            }
        );
        const result = await response.json();
        return result;
    }
    query("Can you please let us know more details about your ").then((response) => {
        console.log(JSON.stringify(response));
    });

    const [tableData, setTableData] = useState([]); 
    
    const [columns, setColumns] = useState([
        {key: 'image', label: 'Image', visible: true},
        {key: 'state1', label: 'k-Nearest Neighbours', visible: false},
        {key: 'state2', label: 'Decision Tree', visible: false},
        {key: 'state3', label: 'Convolutional Neural Network', visible: false},
        {key: 'delete', label: '', visible: true} 
    ]);
    
    const [isCheckAll, setIsCheckAll] = useState(false);
    const [isCheck, setIsCheck] = useState([]);
    const [list, setList] = useState([]);
    const [isButtonClicked, setIsButtonClicked] = useState(false);
    const [imageURL, setImageURL] = useState(null);

    const [previewImage, setPreviewImage] = useState(null);
    const hiddenFileInput = useRef(null);
    const scrollRef = useRef(null);

    useEffect(() => {
        setList(Models);
    }, [list]);

    const handleDeleteRow = (id) => {
        setTableData((prevData) => prevData.filter(row => row.id !== id));
    };

    const handleSelectAll = e => {
        const isChecked = e.target.checked;
        setIsCheckAll(isChecked);
        setIsCheck(isChecked ? list.map(li => li.id) : []);

        setColumns(prevColumns => {
            return prevColumns.map((column, index) => {
                if (index === 0) return column; 
                return { ...column, visible: isChecked };
            });
        });
    };

    const handleClick = (e) => {
        const { id, checked } = e.target;
    
        setIsCheck((prevCheck) => {
            if (checked) {
                return [...prevCheck, id];
            } else {
                return prevCheck.filter((item) => item !== id);
            }
        });
    
        setColumns((prevColumns) => {
            return prevColumns.map((column) => {
                if (column.key === id) {
                    return { ...column, visible: checked };
                } else {
                    return column;
                }
            });
        });

        const selectedModel = Models.find(model => model.id === id);
        if (selectedModel && checked) {
            navigate(selectedModel.link);
        }
    };

    const options = list.map(({id, name, description}) => {
        return (
            <div key={id} className='checkbox-container'>
                <Checkbox
                    key={id}
                    type="checkbox"
                    name={name}
                    id={id}
                    handleClick={handleClick}
                    isChecked={isCheck.includes(id)}
                />
                <label htmlFor={id}>{name}</label>
                {/* Tooltip Icon */}
                <span className="tooltip-icon">
                    <FaInfoCircle className="custom-info-icon" />
                    <span className="tooltip-text" dangerouslySetInnerHTML={{ __html: description }} />
                </span>
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
            const imageURL = URL.createObjectURL(file);
            setPreviewImage(imageURL);
            setImageURL(imageURL);
        }
    }

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const imageURL = URL.createObjectURL(file);
            setPreviewImage(imageURL);
            setImageURL(imageURL);
        }
    }

    const openFileInput = () => {
        hiddenFileInput.current.click()
    }

    const handleClickScroll = () => {
        scrollRef.current?.scrollIntoView({behavior: 'smooth'});
    }

    const handleValidate = async () => {
        setIsButtonClicked(true);
        if (imageURL) {
            const queryData = await query("Can you please let us know more details about your ");
            const queryData2 = await query("Hey there");
            const newImageURL = imageURL;

            const isDuplicate = tableData.some(row => row.image === newImageURL);

            if (!isDuplicate) {
                const newRow = {
                    id: tableData.length + 1,
                    image: imageURL,
                    state1: JSON.stringify(queryData2),
                    state2: JSON.stringify(queryData),
                    state3: JSON.stringify(queryData),
                    visible: true,
                    deletable: true  
                };
                setTableData(prevData => [...prevData, newRow]);
            }

            list.forEach(model => handleClick({ target: { id: model.id, checked: true } }));
        }
    };

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
                        <button type = "button" class = "button" onClick = {handleValidate}>Validate</button>
                    </div>
                    <div id='right-div'>
                        <p>**Instructions**</p>
                        <div id='checkboxes-container'>
                            <div className='checkbox-container'>
                                <Checkbox 
                                type = "checkbox"
                                name = "selectAll"
                                id = "selectAll"
                                handleClick = {handleSelectAll}
                                isChecked = {isCheckAll}
                                />
                                Select All
                            </div>
                            {options}
                            {isButtonClicked && (
                            <table className="custom-table">
                                <thead>
                                    <tr>
                                        {columns.filter(column => column.visible).map(column => (
                                            <th key={column.key}>{column.label}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {tableData.map(row => (
                                        <tr key={row.id}>
                                            {columns
                                                .filter(column => column.visible)
                                                .map(column => (
                                                    <td key={column.key}>
                                                        {column.key === 'image' && row[column.key] ? (
                                                            <img src={row[column.key]} alt="Preview" style={{ width: '100px'}} />
                                                        ) : column.key === 'delete' ? (
                                                            <button className="delete-button" onClick={() => handleDeleteRow(row.id)}>X</button>
                                                        ) : (
                                                            row[column.key]
                                                        )}
                                                    </td>
                                                ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            )}
                        </div>
                        <p className = "textmargin">For more information about the models, click <Link to = "/about#models">here</Link>.</p>
                    </div>
                </div>
            </div>
        </main>
    </>
}
export default Home;
