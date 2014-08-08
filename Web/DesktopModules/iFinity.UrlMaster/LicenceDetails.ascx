<%@ Control Language="C#" AutoEventWireup="false" Inherits="iFinity.DNN.Modules.Licensing.UI.Controls.LicenceDetails" %>
<%@ Register TagPrefix="dnn" TagName="Label" Src="~/controls/LabelControl.ascx" %>
<table class="Normal">
    <tr>
        <td colspan="2">
            <dnn:Label id="lblLicenceDetails" runat="server" CssClass="NormalBold" ResourceKey="Licence Details" Text="Current Licence Details" HelpText="Shows the details of the licence currently loaded for this installation"/>
        </td>
    </tr>
    <tr>
        <td valign="top">
            <dnn:Label id="lblStatusHdr" runat="server" ResourceKey="Status" Text="Licence Status" 
                        HelpText="Shows the current status of your existing licence file"/>
        </td>
        <td>
            <asp:label ID="lblStatus" runat="server" />
        </td>
    </tr>
    <tr runat="server" id="trLicenceType">
        <td><dnn:Label id="lblLicenceTypeHdr" runat="server" ResourceKey="LicenceType" Text="Licence Type"
                        HelpText="The type of licence issued"/></td>
        <td><asp:Label ID="lblLicenceType" runat="server" CssClass= "normal" /></td>
    </tr>
    <tr runat="server" id="trCustomerName">
        <td><dnn:Label id="lblCustomerNameHdr" runat="server" ResourceKey="CustomerName" Text="Customer Name"
                        HelpText="Name of the licence holder"/></td>
        <td><asp:Label ID="lblCustomerName" runat="server" CssClass= "normal" /></td>
    </tr>
    <tr runat="server" id="trContactEmail">
        <td><dnn:Label id="lblContactEmailHdr" runat="server" ResourceKey="ContactEmail" Text="Contact Email"
                        HelpText="Contact email for the licence holder"/></td>
        <td><asp:Label ID="lblContactEmail" runat="server" CssClass= "normal" /></td>
    </tr>
    <tr runat="server" id="trProductName">
        <td><dnn:Label id="lblProductNameHdr" runat="server" ResourceKey="ProductName" Text="Product Name"
                        HelpText="Name of the product the current licence is for"/></td>
        <td><asp:Label ID="lblProductName" runat="server" CssClass= "normal" /></td>
    </tr>
    <tr runat="server" id="trProductVersion">
        <td><dnn:Label id="lblProductVersionHdr" runat="server" ResourceKey="ProductVersion" Text="Product Version"
                        HelpText="Product Version the licence is for"/></td>
        <td><asp:Label ID="lblProductVersion" runat="server" CssClass= "normal" /></td>
    </tr>
    <tr runat="server" id="trIsExpired">
        <td><dnn:Label id="lblIsExpiredHdr" runat="server" ResourceKey="IsExpired" Text="Licence has Expired?"
                        HelpText="If true, this licence has expired"/></td>
        <td><asp:Label ID="lblIsExpired" runat="server" CssClass= "normal" /></td>
    </tr>
    <tr runat="server" id="trIsTrial">
        <td><dnn:Label id="lblIsTrialHdr" runat="server" ResourceKey="IsTrial" Text="Trial Licence?"
                        HelpText="If true, this licence is a Trial Licence for evaluation purposes"/></td>
        <td><asp:Label ID="lblIsTrial" runat="server" CssClass= "normal" /></td>
    </tr>
    <tr runat="server" id="trExpiryDate">
        <td><dnn:Label id="lblExpiryDateHdr" runat="server" ResourceKey="ExpiryDate" Text="Expiry Date"
                        HelpText="The date the licence will expire.  After this date you will view licensing messages from the module."/></td>
        <td><asp:Label ID="lblExpiryDate" runat="server" CssClass= "normal" /></td>
    </tr>
    <tr id="trRecommended" runat="server">
        <td valign="top" colspan="2" style="padding-top:25px;">
            <div class="recommendedHeader">
                <a name="recommended"><dnn:Label id="lblRecommendedHdr" runat="server" ResourceKey="Recommended" Text="Best Licence for your DotNetNuke Installation" 
                            HelpText="Suggests the best type of licence to choose for your DotNetNuke install." CssClass="NormalBold"/>
                </a>
                <asp:Label ID="lblRecommendations" runat="server" CssClass="Normal" />
            </div>
            <table class="Normal recommendedTable" cellpadding="0" cellspacing="0">
                <tr>
                    <th><asp:Label ID="lblLicenceNameHdr" runat="server" /></th>
                    <th><asp:Label ID="lblLicenceDetailHdr" runat="server"/></th>
                </tr>
                <asp:Repeater ID="rptLicenceTypes" runat="server" >
                <ItemTemplate>
                <tr runat="server" id="trLicence">
                    <td valign="top" style="padding-right:15px;">
                        <asp:Label ID="lblLicenceName" runat="server"/>
                        <asp:Image ID="imgRecommended" runat="server" CssClass="recommendedImg" />
                    </td>
                    <td valign="top" >
                        <asp:Label ID="lblLicenceDetail" runat="server" />
                        <p class="licencelinks">
                            <asp:HyperLink ID="hlPurchaseLink" runat="server" CssClass="purchase"/>
                            <asp:HyperLink ID="hlTrialLink" runat="server" CssClass="purchase" />
                        </p>
                    </td>
                </tr>
                </ItemTemplate>
                </asp:Repeater>
            </table>
        </td>
    </tr>
    <tr >
        <td valign="top" style="padding-top:25px;" colspan="2">
            <dnn:Label id="lblPortalStatusHdr" runat="server" ResourceKey="PortalStatus" text="Status of each Portal in this Installation"
                HelpText ="Shows the current status of each portal in your DotNetNuke installation" CssClass="NormalBold" />
        </td>
     </tr>
     <tr>
        <td colspan="2">
        <table class="Normal portalsTable">
            <asp:Repeater ID="rptPortals" runat="server" >
                <HeaderTemplate>
                  <tr>
                    <td style="padding-left:10px;" class="NormalBold">Portal</td>
                    <td class="NormalBold">Alias Licence Status</td>
                  </tr>
                </HeaderTemplate>
                <ItemTemplate>
                  <tr>
                    <td valign="top" style="border-top:solid 1px white;padding-left:10px;">
                        <asp:Label ID="lblPortalName" runat="server" class="httpAlias"/>
                    </td>
                    <td valign="top" style="border-top:solid 1px white;">
                        <table class="Normal" >
                            <asp:Repeater ID="rptPortalLicenses" runat="server">
                                <ItemTemplate>
                                  <tr>
                                    <td valign="middle" style="padding-left:10px;"><asp:Label ID="lblPortalAlias" runat="server" CssClass="Normal"/></td>
                                    <td valign="middle" style="padding-left:10px;"><asp:Image ID="imgLicensed" runat="server" /></td>
                                    <td valign="middle" style="padding-left:10px;"><asp:Label ID="lblLicensed" runat="server" CssClass="Normal"/></td>
                                    
                                  </tr>
                                </ItemTemplate>
                            </asp:Repeater>
                        </table>
                  </td>
                </tr>
                </ItemTemplate>
            </asp:Repeater>
            </table> 
            <div class="faqLink">
                <asp:HyperLink ID="hlFaqLink" runat="server" />
            </div>
        </td>
    </tr>
    <tr>
        <td colspan="2" align="center">
            <asp:HyperLink ID="hlReturn" runat="server" Text="Return to Module" />
            &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
            <asp:HyperLink ID="hlUpload" runat="server" Text="Upload new Licence Keyfile" />
        </td>
    </tr>
</table>
<div id="licenceLink" runat="server">
</div>
