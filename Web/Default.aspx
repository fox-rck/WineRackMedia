<%@ Page Language="C#" AutoEventWireup="false" Inherits="DotNetNuke.Framework.DefaultPage"
    CodeFile="Default.aspx.cs" %>

<%@ Register TagPrefix="dnnui" Namespace="DotNetNuke.Web.UI.WebControls" Assembly="DotNetNuke.Web" %>
<%@ Register TagPrefix="dnn" Namespace="DotNetNuke.Common.Controls" Assembly="DotNetNuke" %>
<%@ Register TagPrefix="telerik" Namespace="Telerik.Web.UI" Assembly="Telerik.Web.UI" %>
<asp:literal id="skinDocType" runat="server"></asp:literal>
<html <%= HtmlAttributeList %>>
<head id="Head" runat="server">
    <meta name="viewport" content="width=device-width">
    <meta content="text/html; charset=UTF-8" http-equiv="Content-Type" />
    <meta content="text/javascript" http-equiv="Content-Script-Type" />
    <meta content="text/css" http-equiv="Content-Style-Type" />
    <meta id="MetaRefresh" runat="Server" http-equiv="Refresh" name="Refresh" />
    <meta id="MetaDescription" runat="Server" name="DESCRIPTION" />
    <meta id="MetaKeywords" runat="Server" name="KEYWORDS" />
    <meta id="MetaCopyright" runat="Server" name="COPYRIGHT" />
    <meta id="MetaGenerator" runat="Server" name="GENERATOR" />
    <meta id="MetaAuthor" runat="Server" name="AUTHOR" />
    <meta name="RESOURCE-TYPE" content="DOCUMENT" />
    <meta name="DISTRIBUTION" content="GLOBAL" />
    <meta id="MetaRobots" runat="server" name="ROBOTS" />
    <meta name="REVISIT-AFTER" content="1 DAYS" />
    <meta name="RATING" content="GENERAL" />
    <meta http-equiv="PAGE-ENTER" content="RevealTrans(Duration=0,Transition=1)" />
    <style type="text/css" id="StylePlaceholder" runat="server"></style>
    <asp:placeholder id="CSS" runat="server" />
    <asp:placeholder id="SCRIPTS" runat="server" />
    <link href='http://fonts.googleapis.com/css?family=Lora:400,700,400italic,700italic' rel='stylesheet' type='text/css'>
    <link href='http://fonts.googleapis.com/css?family=Questrial|Lora:400,700,400italic,700italic' rel='stylesheet' type='text/css'>
    <style>
    
    </style>
</head>
<body id="Body" runat="server">
    <asp:PlaceHolder ID="BodySCRIPTS" runat="server" />
    <dnn:Form ID="Form" runat="server" ENCTYPE="multipart/form-data">
        <asp:Label ID="SkinError" runat="server" CssClass="NormalRed" Visible="False"></asp:Label>
        <asp:PlaceHolder ID="SkinPlaceHolder" runat="server" />
        <input id="ScrollTop" runat="server" name="ScrollTop" type="hidden" />
        <input id="__dnnVariable" runat="server" name="__dnnVariable" type="hidden" />
    </dnn:Form>
     <!--[if (gte IE 6)&(lte IE 8)]>
  <script type="text/javascript" src="http://<%=PortalSettings.PortalAlias.HTTPAlias%>/js/selectivizr-min.js"></script>
  
<![endif]--> 
   
    <script src="http://<%=PortalSettings.PortalAlias.HTTPAlias%>/js/jquery.elegantLoad.js" type="text/javascript"></script>

    <script type="text/javascript">
        $(document).ready(function () {
          //  $(document).elegantLoad({ mainElements: $('#smakk-page-wrapper, #smakk-footer-wrapper').get() });
           
        });
        //This code is to force a refresh of browser cache
        //in case an old version of dnn.js is loaded
        //It should be removed as soon as .js versioning is added
        jQuery(document).ready(function () {
            if (navigator.userAgent.indexOf(" Chrome/") == -1) {
                if ((typeof dnnJscriptVersion === 'undefined' || dnnJscriptVersion !== "6.0.0") && typeof dnn !== 'undefined') {
                    window.location.reload(true);
                }
            }
        });
    </script>
</body>
</html>
