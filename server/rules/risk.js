/**
 *  This file is meant to be included as a string template
 */
module.exports = () => {
    const template = `function (user, context, callback) {


/**
   * This rule has been automatically generated by
   */

  var LOG_TAG = '[RISK_RULE]: ';
  console.log(LOG_TAG, 'Entered Risk Rule...');     
  console.log(configuration);
     if(context.anomalyDetection)
     {
     var overallConfidence = context.anomalyDetection.confidence;
     console.log("Overall login confidence: " + overallConfidence);
     var assessments = context.anomalyDetection.assessments;
     console.log(JSON.stringify(assessments, null, 2));
     if(overallConfidence < 1 )
     {
           context.multifactor = {
           provider: 'guardian',
         // optional, defaults to true. Set to false to force Guardian authentication every time.
         // See https://auth0.com/docs/multifactor-authentication/custom#change-the-frequency-of-authentication-requests for details
         allowRememberBrowser: true
       };
     }
     }
     callback(null, user, context);
   }`;
  
    return template;
  };
  