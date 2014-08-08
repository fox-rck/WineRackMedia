<%@ Control Language="C#" AutoEventWireup="false" Inherits="iFinity.DNN.Modules.UrlMaster.UI.Controls.Uninstall" %>
<%@ Register TagPrefix="dnn" TagName="Label" Src="~/controls/LabelControl.ascx" %>
<table class="normal" cellpadding=10>
    <tr>
        <td valign="top" align="center" colspan="2">
        <asp:label ID="lblStatus" runat="server" CssClass="NormalBold"/>
        </td>
    </tr>
    <tr>
        <td class="uninstallLeftCol"><dnn:Label id="lblStepOne" runat="server" ResourceKey="StepOne" /></td>
        <td class="uninstallRightCol">
            <div class="feedbackText">
                <asp:Label id="lblFeedback" runat="server" CssClass="Normal"/>
                <asp:TextBox ID="txtFeedback" runat="server" TextMode="MultiLine" Rows="10" CssClass="Normal" />
                <asp:RequiredFieldValidator ID="errFeedback" runat="server" CssClass="Normal" Style="display:block;" ControlToValidate="txtFeedback"/>
            </div>
            <div class="feedbackEmail">
                <asp:Label id="lblEmail" runat="server" CssClass="Normal"/>
                <asp:textbox ID="txtEmail" runat="server" CssClass="Normal" />
                
            </div>
            <div id="feedbackButtons">
                <asp:Button ID="btnSendFeedback" runat="server" CssClass="Normal"/>
                <asp:Button ID="btnNoThanks" runat="server" CssClass="Normal" CausesValidation="false"/>
            </div>
            <asp:Label ID="lblFeedbackResult" runat="server" CssClass="feedbackResult" />
        </td>
    </tr>
    <tr runat="server" id="trStepTwo">
        <td class="uninstallLeftCol"><dnn:Label id="lblStepTwo" runat="server" ResourceKey="StepTwo" /></td>
        <td class="uninstallRightCol">
            <asp:Button ID="btnRemoveConfiguration" runat="server" CssClass="Normal" CausesValidation="false"/>
            <div id="removedMsg" runat="server" class="removedMsg">
                <asp:Image ID="imgRemoved" runat="server" CssClass="Normal" />
                <asp:Label ID="lblRemoved" runat="server" CssClass="Normal"/>
            </div>
        </td>
    </tr>
    <tr runat="server" id="trStepThree">
        <td class="uninstallLeftCol">
            <dnn:Label id="lblStepThree" runat="server" ResourceKey="StepThree" />
        </td>
        <td class="uninstallRightCol">
            <asp:Label ID="lblModuleDefinition" runat="server" CssClass="Normal" />
            <asp:Hyperlink id="hlModuleDefinition" runat="server" CssClass="Normal" />
            <asp:Label ID="lblUninstallInstructions" runat="server" CssClass="uninstallInstructions" />
        </td>
    </tr>
</table>
