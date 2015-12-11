/**
* Copyright 2015 IBM Corp.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

var PushAppRealmChallengeHandler = (function(){
    
    var challengeHandler;
    
    function init() {
        challengeHandler = WL.Client.createChallengeHandler("PushAppRealm");
        challengeHandler.isCustomResponse = isCustomResponse;
        challengeHandler.handleChallenge = handleChallenge;
        challengeHandler.submitLoginFormCallback = submitLoginFormCallback;
    }
        
    function isCustomResponse(response) {
        if (!response || response.responseText === null) {
            return false;
        }
        var indicatorIdx = response.responseText.search('j_security_check');

        if (indicatorIdx >= 0){
            return true;
        }  
        return false;
    }
    
    function handleChallenge(response) {
        $('#AppBody').hide();
        $('#AuthBody').show();
        $('#passwordInputField').val('');
    }
    
    function submitLoginFormCallback(response) {
        var isLoginFormResponse = challengeHandler.isCustomResponse(response);
        if (isLoginFormResponse){
            challengeHandler.handleChallenge(response);
        } else {
            $('#AppBody').show();
            $('#AuthBody').hide();
            challengeHandler.submitSuccess();
        }
    }
    
    function submitLoginForm(url, options, callback) {
        challengeHandler.submitLoginForm(url, options, callback)
    }
    
    return {
        init: init,
        submitLoginForm: submitLoginForm,
        submitLoginFormCallback: submitLoginFormCallback
    }
})();