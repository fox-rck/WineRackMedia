<%@ Control language="vb" Inherits="Modules.ContactEdox.View" CodeFile="View.ascx.vb" AutoEventWireup="false" Explicit="True" %>
<div class="contact-form">
    <div class="contact_left">
        <div class="field-row">
            <span class="label">
            
                <asp:RequiredFieldValidator ID="RequiredFieldValidator1" 
                    runat="server" 
                    ControlToValidate="txtName" 
                    ErrorMessage="* " 
                    CssClass="validator" 
                    Display="Dynamic"
                    ValidationGroup="contactForm"
                    ForeColor="#ED1C24"
                />
                <asp:RegularExpressionValidator ID="RegularExpressionValidator2" 
                    runat="server" 
                    ControlToValidate="txtName" 
                    ErrorMessage="*" 
                    CssClass="validator" 
                    Display="Dynamic" 
                    ValidationExpression="[a-zA-Z0-9\-,<>/\.\\!@#\$%\^&\*()\{\}:;\[\]\?\ \+=_~`\|]+"
                    ValidationGroup="contactForm"
                    ForeColor="#ED1C24"
                />
                <asp:CompareValidator  ID="CompareValidator2" 
                        runat="server" 
                         ControlToValidate="txtName" 
                        ErrorMessage="*" 
                         Operator="NotEqual"
                         
                        CssClass="validator" 
                        Display="Dynamic" 
                        ValueToCompare="Name"
                        ValidationGroup="contactForm"
                        ForeColor="#ED1C24"
                /> 
                 
            </span>
            <asp:textbox runat="server" ID="txtName" CssClass="field txtName"/>
        </div>
        
        <div class="field-row">
            <span class="label">
               
                <asp:RequiredFieldValidator ID="RequiredFieldValidator3" 
                    runat="server" 
                    ControlToValidate="txtEmail" 
                    ErrorMessage="* " 
                    CssClass="validator" 
                    Display="Dynamic"
                    ValidationGroup="contactForm"
                    ForeColor="#ED1C24"
                />
                <asp:RegularExpressionValidator ID="RegularExpressionValidator1" 
                    runat="server" 
                    ControlToValidate="txtEmail" 
                    ErrorMessage="*" 
                    CssClass="validator" 
                    Display="Dynamic" 
                    ValidationExpression="[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)*@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+"
                    ValidationGroup="contactForm"
                    ForeColor="#ED1C24"
                />
                 
                
            </span>
            <asp:textbox runat="server" ID="txtEmail" CssClass="field txtEmail"/>
        </div>
        
        
      <div class="field-row">
            <span class="label">
            <asp:RequiredFieldValidator ID="RequiredFieldValidator2" runat="server" 
                    ControlToValidate="txtPhone" 
                    ErrorMessage="*" 
                    CssClass="validator" 
                    Display="Dynamic"
                    ValidationGroup="contactForm"
                    ForeColor="#ED1C24"
                />
                <asp:RegularExpressionValidator ID="RegularExpressionValidator11" 
                        runat="server" 
                        ControlToValidate="txtPhone" 
                        ErrorMessage="*" 
                        CssClass="validator" 
                        Display="Dynamic" 
                        ValidationExpression="[a-zA-Z0-9\-\.\ (),<>/\\!@#\$%\^&\*\{\}:;\[\]\?\+=_~`\|]+"
                        ValidationGroup="contactForm"
                        ForeColor="#ED1C24"
                />     
                <asp:CompareValidator  ID="RegularExpressionValidator3" 
                        runat="server" 
                         ControlToValidate="txtPhone" 
                        ErrorMessage="*" 
                         Operator="NotEqual"
                         
                        CssClass="validator" 
                        Display="Dynamic" 
                        ValueToCompare="Phone Number"
                        ValidationGroup="contactForm"
                        ForeColor="#ED1C24"
                />          
             
            </span>
            <asp:textbox runat="server" ID="txtPhone" CssClass="field txtPhone"/>
        </div>
    </div>
    <div class="field-row">
           
                 <asp:textbox runat="server" ID="txtMessage" TextMode="MultiLine" CssClass="field txtMessage"/>
                 </div>
                   <div class="field-row">
    <div class="thebox">
    <%--<asp:CheckBox runat="server" ID="preferphone" /><asp:Label AssociatedControlID="preferphone" runat="server" Text="">I prefer to be contacted by phone</asp:Label>--%>
    <input type="checkbox" class="checkbox" id="preferphone" /><label for="preferphone">I prefer to be contacted by phone</label>
    
    </div>
    </div>
    <input type="hidden" id="preferphonecheck" class="preferphonecheck" runat="server" />
        <div class="button_submit">
            <asp:LinkButton runat="server" ID="btnSubmit" cssclass="button" ValidationGroup="contactForm" Text="Send Edox an Email"></asp:LinkButton>
        </div>
  
    <div class="clear"></div>
</div>
<script runat="server" language="vbscript">
Protected Overrides Sub OnLoad(ByVal e As System.EventArgs)
        MyBase.OnLoad(e)
        Page.ClientScript.RegisterClientScriptInclude("contact_us_script", ResolveUrl("~/DesktopModules/ContactEdox/scripts/contact_us.js"))
    End Sub    
</script>