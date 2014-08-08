<%@ Control Language="C#" Inherits="iFinity.DNN.Modules.UrlMaster.UI.Controls.Site404Logs" AutoEventWireup="false" %>
<%@ Register Assembly="System.Web.Extensions" Namespace="System.Web.UI" TagPrefix="asp" %>
<%@ Register TagPrefix="dnn" TagName="Label" Src="~/controls/LabelControl.ascx" %>

<img src="<% =ModulePath + "images/minus.gif" %>" id='minus' style="display:none;"/>
<img src="<% =ModulePath + "images/plus.gif" %>" id='plus' style="display:none;"/>
<asp:Label ID="lblMessages" runat="server" CssClass="Normal 404Messages" />
<table id="site404Logs" class="Normal" >
<asp:Repeater id="rptSiteLogs" runat="server" >
    <HeaderTemplate>
        <tr valign="top">
            <td></td>
            <td><dnn:Label id="lblRequestDateTimeHdr" runat="server" CssClass="NormalBold" ResourceKey="RequestDateTime"/></td>
            <td width="50%"><dnn:Label id="lblUrlHdr" runat="server" CssClass="NormalBold" ResourceKey="Url"/></td>
            <td><dnn:Label id="lblOriginalUrlHdr" runat="server" CssClass="NormalBold" ResourceKey="OriginalUrl" style="width:200px"/></td>
        <!--<td><dnn:Label id="lblHttpAliasHdr" runat="server" CssClass="NormalBold" ResourceKey="HttpAlias"/></td>
            <td><dnn:Label id="lblTabNameHdr" runat="server" CssClass="NormalBold" ResourceKey="TabName"/></td>
            <td><dnn:Label id="lblUserAgentHdr" runat="server" CssClass="NormalBold" ResourceKey="UserAgent"/></td>
            <td><dnn:Label id="lblHostAddressHdr" runat="server" CssClass="NormalBold" ResourceKey="HostAddress"/></td>
            <td><dnn:Label id="lblHostNameHdr" runat="server" CssClass="NormalBold" ResourceKey="HostName"/></td>-->
        </tr>
    </HeaderTemplate>
    <ItemTemplate>
        <tr valign="top" class="site404LogRow">
            <td width="25px"></td>
            <td><asp:Label id="lblRequestDateTime" runat="server" CssClass="Normal datetime" /></td>
            <td><asp:Label id="lblUrl" runat="server" CssClass="Normal url" /></td>
            <td><asp:Label ID="lblReferer" runat="server" CssClass="Normal url" /></td>
        </tr>
        <tr valign="top" class="site404LogDetailRow">
            <td>&nbsp;</td>
            <td align="right">
                <asp:Label ID="lblSecondRowHeader" runat="server" CssClass="NormalBold" />
            </td>
            <td>
                <asp:Label id="lblHostAddress" runat="server" CssClass="Normal"/>
                <br />
                <asp:Label id="lblUserAgent" runat="server" CssClass="Normal" />
                <br />
                <asp:Label id="lblHostName" runat="server" CssClass="Normal" Visible='false'/>    
            </td>
            <td>
                <asp:Label id="lblOriginalUrl" runat="server" CssClass="Normal url" />
                <br />
                <asp:Label id="lblHttpAlias" runat="server" CssClass="Normal" />
                <br />
                <asp:Label id="lblTabName" runat="server" CssClass="Normal" />
            </td>
        </tr>
    </ItemTemplate>
    <FooterTemplate>
        <tr>
            <td colspan="5" align="center">
                <asp:Label ID="lblPaging" runat="server" />
            </td>
        </tr>
    </FooterTemplate>
</asp:Repeater>
</table>
<div id="calendarBar">
    <dnn:Label id="lblDateFiltering" runat="server" CssClass="NormalBold" ResourceKey="DateFiltering" />
    <asp:Label id="lblFromDate" runat="server" /><asp:TextBox id="txtFromDate" runat="server" CssClass="Normal" /><asp:hyperlink id="cmdCalendarFrom" resourcekey="Calendar" cssclass="CommandButton" runat="server" />
    <asp:Label id="lblToDate" runat="server" /><asp:TextBox id="txtToDate" runat="server" CssClass="Normal" /><asp:hyperlink id="cmdCalendarTo" resourcekey="Calendar" cssclass="CommandButton" runat="server" />
    <asp:Button ID="btnRefresh" runat="server" CssClass="Normal" />
</div>
<div id="returnLink">
    <asp:HyperLink ID="hlReturn" runat="server" CssClass="Normal" />
</div>

