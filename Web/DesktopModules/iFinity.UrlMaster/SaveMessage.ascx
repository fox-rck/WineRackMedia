<%@ Control language="C#" AutoEventWireup="false" Inherits="iFinity.DNN.Modules.UrlMaster.UI.Controls.SaveMessage" %>
<script type="text/javascript" >

    function showErrorMessage(elId, showForSeconds)
    {
        window.setTimeout('hideErrorMessage(\'' + elId + '\')', 1000 * showForSeconds);
    }
    function hideErrorMessage(elId)
    {
        jQuery('#' + elId).hide('slow');
    }

</script>
<div id="saveMessage" runat="server" visible="false" class="saveMessage">
    <asp:Image ID="imgSaveMessage" runat="server" CssClass="Normal" Visible="False"/>
    <asp:Label ID="lblSaveMessage" runat="server" CssClass="Normal" Visible="False"/>
</div>
