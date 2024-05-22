import './style.css'

const About = () => {
    return <>
        <main>
      <div class="incontainer">
        <div class = "body_gradient">
          <h2 class = "body_title">Process</h2>
          <p class = "body_text">
            Two datasets were used: 
              <ol>
                <li>
                  <a href="https://www.kaggle.com/datasets/shreelakshmigp/cedardataset">CEDAR dataset</a> 
                  <ul>
                    <li>initally introduced by 
                      <a href="https://cedar.buffalo.edu/~srihari/papers/ICGVIP2006-sig.pdf">Srinivasn et al.</a>
                    </li>
                    <li>
                      1320 genuine signatures from 55 individuals who contributed 24 signatures each
                    </li>
                    <li>
                      1320 forged signatures as some were asked to forge 3 other writers' signatures
                    </li>
                  </ul>
                </li>
                <li>
                  <a href="https://www.kaggle.com/datasets/robinreni/signature-verification-dataset">ICDAR 2011 Signature Dataset</a> 
                  <ul>
                    <li>from 
                      <a href="https://ieeexplore.ieee.org/document/6065554">SigComp2011</a>
                    </li>
                    <li>
                      1320 genuine signatures from 55 individuals who contributed 24 signatures each
                    </li>
                    <li>
                      1320 forged signatures as some were asked to forge 3 other writers' signatures
                    </li>
                  </ul>
                </li>
              </ol>
            </p>
        </div>
        <h2 class = "body_title">The Models</h2>
        <p class = "body_text">Model 1</p>
      </div>
    </main>
    </>
}
export default About;