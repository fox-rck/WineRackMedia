<%@ Control Language="C#" AutoEventWireup="false" Inherits="iFinity.DNN.Modules.UrlMaster.UI.Controls.TabSingleSelect" %>

<div id="tabsContainer" runat="server" >
<asp:Label id="lblTabs" runat="server" CssClass="Normal" /><select id="lstTabs" runat="server" CssClass="Normal tss_list" EnableViewState="false" size="4" />
<asp:HiddenField id="hdnOptions" runat="server" />
<span class="tss_searchbox"><asp:TextBox ID="txtSearchString" runat="server" CssClass="Normal tss_search" /><a id="hlSearch" runat="server" href="#"><asp:Image ID="imgSearch" runat="server" class="tss_searchImg" /></a></span>
<div id="navLinks" runat="server" >
    <a id="hlFirst" runat="server" href="#"><<=</a><a id="hlPrev" href="#" runat="server"><=</a> <asp:Label id="lblPages" runat="server"/> <a id="hlNext" href="#" runat="server">=></a><a id="hlLast" href="#" runat="server" >=>></a>
</div>
</div>
<asp:Image id="imgLoading" runat="server" class="tss_loadingImg" style="display:none;"/>
<script type="text/javascript">
//<![CDATA[
jQuery(document).ready(function($){
    //call setup routine
    ifty_tss.registerControl('<%= AjaxHandlerPath() %>', '<%= ContainerId %>', '<%= AutoPostBack %>');
});
//]]>
</script>
