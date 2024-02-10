import './style.css'

const Home = () => {
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
                    <label>
                        <input type = "checkbox" class = "checkboxes" /> Model 1
                    </label>
                    <label>
                        <input type = "checkbox" class = "checkboxes" /> Model 2
                    </label>
                    <label>
                        <input type = "checkbox" class = "checkboxes" /> Select All
                    </label>
                    <p class = "textmargin">For more information about the models, click <a href = "about.html">here.</a></p>
                </div>
                </div>
            </div>
        </main>
    </>
}
export default Home;