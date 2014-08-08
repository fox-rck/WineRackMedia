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
        
        
      
    </div>
    
                   <div class="radio_row">
                <asp:RadioButton checked="true"  id="lawfirm" GroupName="withtype" runat="server"/><asp:Label  AssociatedControlID="lawfirm"  id="lawfrmlbl"  runat="server">I'm with a law firm</asp:Label>
    <%--<input type="radio" checked="checked" class="radiobtn" id="lawfirm" name="withtype"/><label for="lawfirm"  id="lawfrmlbl"  runat="server">I'm with a law firm</label>--%>
       </div>
       <div class="radio_row">  
       <asp:RadioButton   id="corporation" GroupName="withtype" runat="server"/><asp:Label  AssociatedControlID="corporation"  id="corplbl"  runat="server">I'm with a corportation</asp:Label>
    <%--<input type="radio" class="radiobtn" id="corporation" name="withtype" runat="server"/><label for="corporation" id="corplbl"  runat="server">I'm with a corportation</label>--%>
      </div>
 
    <input type="hidden" id="preferphonecheck" class="preferphonecheck" runat="server" />
        <div class="button_submit">
            <asp:LinkButton runat="server" ID="btnSubmit" cssclass="button" ValidationGroup="contactForm" Text="Email Me These Case Studies"></asp:LinkButton>
            <div>We never spam. Your email is <a target="_parent" href="/legal-and-privacy">safe with us.</a></div>
        </div>
  
    <div class="clear"></div>
</div>
<script runat="server" language="vbscript">
Protected Overrides Sub OnLoad(ByVal e As System.EventArgs)
        MyBase.OnLoad(e)
        Page.ClientScript.RegisterClientScriptInclude("contact_us_script", ResolveUrl("~/DesktopModules/casestudycontact/scripts/contact_us.js"))
    End Sub    
</script>