//showMessage.js : shows/hides a div for a specific time period
var msgTimeoutId; var shown;
function showMessage(elId, showForSeconds)
{
    msgTimeoutId = window.setTimeout('hideMessage(\'' + elId + '\')', 1000 * showForSeconds);
}
function hideMessage(elId)
{
    window.clearTimeout(msgTimeoutId);
    var el = document.getElementById(elId);
    if (el != null)
    {
        el.style.visibility = "hidden";
    }
}
function clearMessage(elId)
{
    var el = document.getElementById(elId);
    if (el != null)
    {
        vis = el.style;  
        // if the style.display value is blank we try to figure it out here  
        if(vis.display==''&&el.offsetWidth!=undefined&&el.offsetHeight!=undefined)    
        {
            vis.display = (el.offsetWidth!=0&&el.offsetHeight!=0)?'block':'none';  
            vis.display = (vis.display==''||vis.display=='block')?'none':'block';
        }
    }
}
