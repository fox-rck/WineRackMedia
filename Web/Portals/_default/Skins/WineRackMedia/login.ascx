<%@ Control Language="vb" AutoEventWireup="false" Explicit="True" Inherits="DotNetNuke.UI.Skins.Skin" %>
<%@ Register TagPrefix="dnn" TagName="LANGUAGE" Src="~/Admin/Skins/Language.ascx" %>
<%@ Register TagPrefix="dnn" TagName="SEARCH" Src="~/Admin/Skins/Search.ascx" %>
<%@ Register TagPrefix="dnn" TagName="NAV" Src="~/Admin/Skins/Nav.ascx" %>
<%@ Register TagPrefix="dnn" TagName="TEXT" Src="~/Admin/Skins/Text.ascx" %>
<%@ Register TagPrefix="dnn" TagName="BREADCRUMB" Src="~/Admin/Skins/BreadCrumb.ascx" %>
<%@ Register TagPrefix="dnn" TagName="USER" Src="~/Admin/Skins/User.ascx" %>
<%@ Register TagPrefix="dnn" TagName="LOGIN" Src="~/Admin/Skins/Login.ascx" %>
<%@ Register TagPrefix="dnn" TagName="LEFTMENU" Src="~/Admin/Skins/LeftMenu.ascx" %>
<%@ Register TagPrefix="dnn" TagName="LINKS" Src="~/Admin/Skins/Links.ascx" %>
<%@ Register TagPrefix="dnn" TagName="PRIVACY" Src="~/Admin/Skins/Privacy.ascx" %>
<%@ Register TagPrefix="dnn" TagName="TERMS" Src="~/Admin/Skins/Terms.ascx" %>
<%@ Register TagPrefix="dnn" TagName="COPYRIGHT" Src="~/Admin/Skins/Copyright.ascx" %>
<%@ Register TagPrefix="dnn" TagName="STYLES" Src="~/Admin/Skins/Styles.ascx" %>
<%@ Register TagPrefix="dnn" Namespace="DotNetNuke.Web.DDRMenu.TemplateEngine" Assembly="DotNetNuke.Web.DDRMenu" %>
<%@ Register TagPrefix="dnn" TagName="MENU" Src="~/DesktopModules/DDRMenu/Menu.ascx" %>
<%@ Register TagPrefix="dnn" TagName="CONTROLPANEL" Src="~/Admin/Skins/controlpanel.ascx" %>
<%@ Register TagPrefix="dnn" TagName="SMaKKSitesNav" Src="~/Admin/Skins/SMaKKSitesNav.ascx" %>
<%@ Register TagPrefix="dnn" TagName="SMaKKSitesFooter" Src="~/Admin/Skins/SMaKKSitesFooter.ascx" %>
<%-- Social Icon StyleSheets --%>

<link href="<%=skinpath%>/scripts/SMKKPlayer-multi.css" rel="stylesheet" type="text/css" />
<%-- End Social Icon StyleSheets --%>
<div id="fb-root">
</div>
<!--
<script type="text/javascript">    (function (d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) return;
        js = d.createElement(s); js.id = id;
        js.src = "//connect.facebook.net/en_US/all.js#xfbml=1";
        fjs.parentNode.insertBefore(js, fjs);
    } (document, 'script', 'facebook-jssdk'));</script>
-->
<dnn:STYLES runat="server" ID="StylesIE7" Name="IE7Minus" StyleSheet="ie7skin.css"
    Condition="LT IE 8" UseSkinPath="true" />
<div id="ControlPanelWrapper">
    <dnn:CONTROLPANEL runat="server" ID="cp" IsDockable="True" />
</div>
<div id="mask"></div>
<div id="popupwrapper"><div id="popupcontent"></div></div>
<div id="wrap">

	<div id="main">
    <div id="page-wrapper" class="page-<%=PortalSettings.ActiveTab.BreadCrumbs(0).TabName.toLower.Replace(" ","_")%>">
<div class="announcemnts" id="announcments" runat="server"></div>
    <div class="site_header">
 <a href="/"><img class="ignoreElegantLoad" src="/Portals/_default/Skins/WineRackMedia/images/png/logo.png" /></a>
<div class="subheader">WEB SOLUTIONS FOR THE LIQUOR INDUSTRY</div>
 <div><dnn:MENU ID="MENU1" MenuStyle="DNNStandard" runat="server"></dnn:MENU></div>
      <div class="clear"></div>
    </div>
    <div id="content-wrapper">
        <div id="content">
            <!-- INSERT CONTENT HERE -->
          
            <!-- INSERT CONTENT HERE -->
            <div id="ContentPane" runat="server" style="margin-top:300px;">
 <asp:LoginView ID="LoginView1" runat="server">
<LoggedInTemplate><a href="/logoff.aspx">Logoff</a></LoggedInTemplate>
 <AnonymousTemplate> 
    <asp:Panel ID="panelLogin" runat="server" DefaultButton="Login$LoginButton"> 
      <asp:Login ID="Login" runat="server" DestinationPageUrl="/" /> 
    </asp:Panel> 
  </AnonymousTemplate> 
</asp:LoginView>
            </div>
        </div>
    </div>
     </div>
	</div>

</div>

<div id="footer">
<div class="footerContainer" >
  <div class="site_footer">
      <div class="inner" id="FooterContent" runat="server">
     
      </div>
     
    </div><!-- site_footer -->
    <div class="clear"></div>
</div>
</div>


 <!--[if (gte IE 6)&(lte IE 8)]>
  <link href="http://<%=PortalSettings.PortalAlias.HTTPAlias%>/portals/_default/skins/edox/IEfixes.css" rel="stylesheet" type="text/css" />
<![endif]--> 
 <!--[if (gte IE 6)&(lte IE 7)]>
  <link href="http://<%=PortalSettings.PortalAlias.HTTPAlias%>/portals/_default/skins/edox/IE7fixes.css" rel="stylesheet" type="text/css" />
<![endif]--> 

    <script runat="server">
        'for mega menu we need to register hoverIntent plugin, but avoid duplicate registrations
        Protected Overrides Sub OnLoad(ByVal e As System.EventArgs)
            MyBase.OnLoad(e)
            Page.ClientScript.RegisterClientScriptInclude("hoverintent", ResolveUrl("~/Resources/Shared/Scripts/jquery/jquery.hoverIntent.min.js"))
            Page.ClientScript.RegisterClientScriptInclude("praxisdigitalsolutions", SkinPath & "scripts/praxisdigitalsolutions.js")
            'Page.ClientScript.RegisterClientScriptInclude("smkkplayer", SkinPath & "scripts/SMKKPlayer-multi.js")
            Page.ClientScript.RegisterClientScriptInclude("modernizr", SkinPath & "scripts/libs/modernizr.js")
            'Page.ClientScript.RegisterClientScriptInclude("plugins", SkinPath & "scripts/plugins.js")
            'Page.ClientScript.RegisterClientScriptInclude("sitescript", SkinPath & "scripts/sitescript.js")
            Page.ClientScript.RegisterClientScriptInclude("cycle", SkinPath & "scripts/jquery.cycle.min.js")
        Page.ClientScript.RegisterClientScriptInclude("magnific-popup", SkinPath & "scripts/magnific-popup.js")  
            Page.ClientScript.RegisterClientScriptInclude("main", SkinPath & "scripts/main_prod.js")
            Page.ClientScript.RegisterClientScriptInclude("touchwipe", SkinPath & "scripts/touchwipe.js")
            
            '-- stop the slideshow if in edit mode
            If IsEditMode() Then
                Page.ClientScript.RegisterClientScriptBlock(Me.GetType, "editmode-cycle-stop", "editMode = true;", True)
            End If
        End Sub
    </script>
