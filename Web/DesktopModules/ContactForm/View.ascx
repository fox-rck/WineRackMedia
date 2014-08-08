<%@ Control language="vb" Inherits="Modules.ContactForm.View" CodeFile="View.ascx.vb" AutoEventWireup="false" Explicit="True" %>
<div class="contact-form">
<div>
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
            <div class="right">
              <p>
                We'll call you within 30 minutes.<br /> Monday to Friday, 9am to 6pm CST.
              </p>
               <asp:LinkButton runat="server" ID="submitbtn" cssclass="submit button" ValidationGroup="contactForm" Text=""></asp:LinkButton>
              <%-- <asp:Button id="submitbtn" Text="" runat="server" class="submit"/>
             <input type="submit" value="Meet Our Relativity Team" name="submit" id="submitbtn" runat="server"/>--%>
              <p>
               Or Call 866.975.7100
              </p>
            </div>
            <div class="clear"></div>

</div>
<script runat="server" language="vbscript">
Protected Overrides Sub OnLoad(ByVal e As System.EventArgs)
        MyBase.OnLoad(e)
        Page.ClientScript.RegisterClientScriptInclude("contact_us_script", ResolveUrl("~/DesktopModules/ContactForm/scripts/contact_us.js"))
    End Sub    
</script>