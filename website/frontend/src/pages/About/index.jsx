import './style.css'

const About = () => {
    return <>
        <main>
      <div class="incontainer">
        <div class = "body_gradient">
          <h2 class = "body_title">Process</h2>
          <p class = "body_text">
            The training sets, validation sets, and test sets were created by concatenating the corresponding sets from each of following datasets.
              <ol>
                <li>
                  <a href="https://www.kaggle.com/datasets/shreelakshmigp/cedardataset">CEDAR dataset</a> 
                  <ul>
                    <li>initally introduced by &#8203;
                      <a href="https://cedar.buffalo.edu/~srihari/papers/ICGVIP2006-sig.pdf">Srinivasn et al. in 2006</a>
                    </li>
                    <li>
                      1320 genuine signatures from 55 individuals who contributed 24 signatures each
                    </li>
                    <li>
                      1320 forged signatures as some were asked to forge 3 other writers' signatures
                    </li>
                    <li>
                      These 2640 signatures were randomly split 15% for the test set, 15% for the validation set, and 70% for the training set.
                    </li>
                  </ul>
                </li>
                <li>
                  <a href="https://www.kaggle.com/datasets/robinreni/signature-verification-dataset">ICDAR 2011 Signature Dataset</a> 
                  <ul>
                    <li>from &#8203;
                      <a href="https://ieeexplore.ieee.org/document/6065554">SigComp2011</a>
                    </li>
                    <li>
                      64 individuals who on average contributed 12 genuine signatures and had 12 forged signatures for a total of 2149 signatures
                    </li>
                    <li>
                      In total, 500 signatures were used as the test set, 296 set aside for validation, and the rest for training.
                    </li>
                  </ul>
                </li>
              </ol>
          </p>
        <h2 class = "body_title">The Models</h2>
        <h3> k-Nearest Neighbours Model</h3>
        <p class = "body_text">By Steven Lin</p>
        <h4>Model Parameters</h4>
        <p class = "body_text">
          This model has 1 hyperparameter, k, which is the number of neighbouring 
          data points that will be used for predicting a new data point. 
          By using Euclidean Distance, the model calculates the distance that the 
          new data point is to every other point that is already present in the model,
          based on the data that it was trained on. Then, the model outputs the most 
          common label of the nearest k values. 
        </p>
        <h4>Model Evaluation</h4>
        <p class = "body_text">
        The model was trained on collected signatures with some marked as authentic 
        and some as forgery. Then, each image data and its pixels were parsed into 
        RGB values that were stored in a tuple and passed into a .npy file. 
        </p>
        <p class = "body_text">
        The data was then reshaped into 2-D arrays for KNN model to work. The model 
        performance was enhanced by fine tuning the number of neighbours by plotting 
        the accuracy of the model against the number of neighbours chosen. The result 
        with the highest accuracy was chosen for the k-value. 
        </p>
        <p class = "body_text">
        In the end, the model achieved a test accuracy score of 83.8%, a training accuracy 
        score of 89.2%, and a validation accuracy score of 85.1% with a K-value of 8.
        </p>

        <h3> Decision Tree Classifier</h3>
        <p class = "body_text">By Dorothy Lee</p>
        <h4>Model Parameters</h4>
        <p class = "body_text">
        The general model is fitted with criterion, mins_samples_leaf, min_samples_split, 
        splitter, max_leaf_nodes, max_features, and max_depth parameters. 
        </p>
        <p class = "body_text">
        General model 1 employs the Gini impurity criterion to assess split quality, 
        requiring at least 10 samples in each leaf node and 600 samples for further 
        node splitting. Using the 'best' strategy, it selects optimal splits at each 
        node while limiting the tree to a maximum of 300 leaf nodes and considering a 
        maximum of 600 features for split determination. The maximum depth of the tree 
        is constrained to 10 levels. 
        </p>
        <p class = "body_text">
        General model 2 utilizes the entropy criterion to measure split quality. 
        It requires a minimum of 10 samples in each leaf node and 600 samples for further 
        splitting, with the 'best' strategy for selecting optimal splits. The maximum number 
        of leaf nodes is 300, and it considers up to 600 features for determining splits. 
        The depth of this decision tree is limited to 30. 
        </p>
        <p class = "body_text">
        The individual model is fitted with criterion, splitter, min_samples_split and max_depth parameters.
        </p>
        <p class = "body_text">
        Individual model 1 uses the entropy criterion to measure the quality of splits 
        with the 'best' strategy for selecting optimal splits at each node. With a minimum 
        of 4 samples required for further splitting and a maximum depth limited to 4 levels.
        </p>
        <p class = "body_text">
        Individual model 2 evaluates the quality of splits based on the Gini impurity criterion, 
        coupled with a 'random' strategy for selecting splits at each node. With a minimum of 8 
        samples needed for further splitting and a maximum depth restricted to 2 levels.
        </p>
        <h4>Training & Tuning</h4>
        <p class = "body_text">
        The general model was trained on a data set consisting of 3194 signature images and 
        labels that indicated if it was a forgery or an original. 
        </p>
        <p class = "body_text">
        The individual data was trained on a data set consisting of 20 signature images 
        specific to one person and labels that indicated if it was a forgery or an original.
        </p>
        <p class = "body_text">
        Both types of models were tuned conducting gird searches using sklearn model_selection 
        package’s GridSearchCV function. Multiple randomly chosen parameter combinations were 
        put in a list and fitted all together. The parameters with the highest accuracies 
        were recorded. With the gathered parameter values and scores, frequently used 
        parameters were selected to fit several decision classifiers 10 times. Each 
        model’s prediction accuracies of the validation set were recorded. The parameters
        that consistently gave high scores were selected to be used for the final 
        two decision tree classifiers of the general and individual models.
        </p>
        <h4>Metrics</h4>
        <p class = "body_text">
          Rounded to nearest tenth
          <table>
            <tr>
              <th>General Model / Score</th>
              <th>Training</th>
              <th>Validation</th>
              <th>Testing</th>
            </tr>
            <tr>
              <td>Gini</td>
              <td>87.2% </td>
              <td>85%</td>
              <td>83%</td>
            </tr>
            <tr>
              <td>Entropy</td>
              <td>87.6% </td>
              <td>85%</td>
              <td>86.4%</td>
            </tr>
          </table>
          <table>
            <tr>
              <th>Individual Model / Score</th>
              <th>Training</th>
              <th>Testing</th>
            </tr>
            <tr>
              <td>Gini</td>
              <td>100% </td>
              <td>92.9%</td>
            </tr>
            <tr>
              <td>Entropy</td>
              <td>100% </td>
              <td>78.6%</td>
            </tr>
          </table>
        </p>
        <h4>Analysis</h4>
        <p class = "body_text">
        General
        <ul>
          <li>The testing accuracies might have been elevated 
            because the test dataset contained fewer images (500) 
            compared to the training and validation datasets. 
            This discrepancy arose from a misalignment of the second 
            dataset's labels’ axis, preventing their concatenation 
            with the first dataset.
          </li>
        </ul>
        Individual
          <ul>
            <li>The validation set only had four images, so it 
              was combined with the test set that contained 24 images. 
              The training set only had 20 images, which is less 
              than the combined testing set. Therefore, it is possible 
              that the models are overfitting.
            </li>
            <li>
            However, given that the data was restricted to the 
            signatures of just one individual, the outcomes are less surprising.
            </li>
          </ul>
        </p>


        <h3> CNN Model</h3>
        <p class = "body_text">By Puneet Kaur</p>
        <h4>Architecture</h4>
        <p class = "body_text">
        The CNN model comprises three convolutional layers with 32, 64, and 128 filters 
        and kernel size of 3x3, respectively, each followed by 2x2 max-pooling layers. 
        Subsequently, we flatten the output from the convolutional and pooling layers 
        to be fed into the fully connected layers. Then we have a fully connected layer
        with 64 units and ReLU activation. After our first fully connected layer, 
        we apply a dropout of 0.2 to help the model generalise better and reduce 
        overfitting. Lastly we have an outer fully connected layer of 1 unit with 
        sigmoid activation function for binary classification.
        </p>

        <h4>Training Details</h4>
        <p class = "body_text">
        <ul>
          <li> <b>Optimizer: </b> Adam optimizer with a learning rate of 0.0001. </li>  
          <li><b>Loss Function:</b> binary cross-entropy</li>
          <li><b>Batch Size:</b> 32</li>
          <li><b>Number of Epochs:</b> 10</li>
        </ul>
        </p>
        <h4>Results</h4>
        <p class = "body_text">
          <ul>
            <li><b>Training Accuracy:</b> 90.72%</li>
            <li><b>Training Loss:</b> 23.93%</li>
            <li><b>Validation Accuracy:</b> 79.83%</li>
            <li><b>Validation Loss:</b> 42.00%</li>
            <li><b>Testing Accuracy:</b> 86.72%</li>
            <li><b>Testing Loss:</b> 29.01%</li>
          </ul>
        </p>
        </div>
      </div>
    </main>
    </>
}
export default About;