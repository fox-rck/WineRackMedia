<%@ Control Language="C#" AutoEventWireup="false" Inherits="iFinity.DNN.Modules.Licensing.UI.Controls.LicenceUpload" %>
<%@ Register TagPrefix="dnn" TagName="Label" Src="~/controls/LabelControl.ascx" %>
<table class="normal">
    <tr>
        <td valign="top"><dnn:Label id="lblStatusHdr" runat="server" ResourceKey="Status" Text="Licence Status" 
                        HelpText="Shows the current status of your existing licence file"/></td>
        <td><asp:label ID="lblStatus" runat="server" />
            <asp:Repeater ID="rptPortals" runat="server" >
                <HeaderTemplate>
                  <tr>
                    <td style="padding-left:10px;" class="NormalBold">Portal</td>
                    <td class="NormalBold">Alias Licence Status</td>
                  </tr>
                </HeaderTemplate>
                <ItemTemplate>
                  <tr>
                    <td valign="top" style="border-top:solid 1px #efefef;padding-left:10px;">
                        <asp:Label ID="lblPortalName" runat="server" />
                    </td>
                    <td valign="top" style="border-top:solid 1px #efefef;">
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
            <div id="licenceLink" runat="server">
            <asp:HyperLink ID="hlLicensingLink" runat="server" CssClass="normal" />
            </div>
        </td>
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
    <tr runat="server" id="trLicenceType">
        <td><dnn:Label id="lblLicenceTypeHdr" runat="server" ResourceKey="LicenceType" Text="Licence Type"
                        HelpText="The type of licence issued"/></td>
        <td><asp:Label ID="lblLicenceType" runat="server" CssClass= "normal" /></td>
    </tr>
    <tr>
        <td>
            <dnn:Label id="lblUploadFileHdr" runat="server" ResourceKey="UploadFileHdr" Text="Upload Licence File"
                        HelpText="To load a new licence file, follow these steps:&lt;br/&gt;1) Obtain a licence file by visiting &lt;a href='http://www.ifinity.com.au/Licensing/'>the Licensing page for this product&lt;/a&gt;&lt;br/&gt;2) Click on 'Browse' and select the licence file you have been issued.&lt;br/&gt;3) Click on 'Upload Selected File' to upload your licence file."/>
            <br />
            <asp:FileUpload ID="uplLicenseFile" runat="server" CssClass="normal"/>
            <asp:Button ID="btnUpload" runat="server" CssClass="normal" Text="Upload Selected File"/>
        </td>
    </tr>
    <tr>
        <td colspan="2" align="center">
            <asp:HyperLink ID="hlReturn" runat="server" Text="Return to Friendly Url Settings" />
            &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
            <asp:HyperLink ID="hlDetails" runat="server" Text="View Current Licence Status" />
        </td>
    </tr>
</table>
