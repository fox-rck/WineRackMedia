<%@ Control Language="C#" Inherits="iFinity.DNN.Modules.UrlMaster.UI.Controls.PageList" AutoEventWireup="false" %>
<%@ Register Assembly="System.Web.Extensions" Namespace="System.Web.UI" TagPrefix="asp" %>
<%@ Register TagPrefix="dnn" TagName="Label" Src="~/controls/LabelControl.ascx" %>
<%@ Register TagPrefix="ifty" TagName="TabSingleSelect" Src="TabSingleSelect.ascx" %>
<%@ Register TagPrefix="ifty" TagName="SaveMessage" Src="SaveMessage.ascx" %>
<%@ Register TagPrefix ="ifty" TagName="PropertySource" Src="PropertySource.ascx" %>
<div id="tabs" class="dnnForm">
<ul class="dnnAdminTabNav dnnClear">
    <li class="first"><a href="#pageListTab"><asp:Label Id="lblPageListTabHdr" runat="server"/></a></li>
    <li><a href="#portalSettings"><asp:Label ID="lblPortalSettingsTabHdr" runat="server" /></a></li>
    <li><a href="#errors404s"><asp:Label ID="lblErrors404sTabHdr" runat='server' /></a></li>
    <li><a href="#advSettingsTab"><asp:Label ID="lblAdvancedSettingsTabHdr" runat='server' /></a></li>
    <li><a href="#regexSettingsTab"><asp:Label ID="lblRegexSettingsTabHdr" runat='server' /></a></li>
    <li><a href="#testUrls"><asp:Label ID="lblTestUrlsTabHdr" runat='server' /></a></li>
</ul>
<div id="pageListTab">
    <asp:Panel id="urlMaster_PageList" CssClass="urlMaster_PageList" runat="server">
    <asp:UpdatePanel id="updPageUrls" runat="server">
        <ContentTemplate>
        <asp:UpdateProgress id="updGenTestUrls" runat="server" DynamicLayout="true" AssociatedUpdatePanelID="updPageUrls" Visible="true" >
            <ProgressTemplate>
                <div id="testWaiting">
                    <img id="imgLoading" runat="server" src="images/loading.gif" alt="Loading..."/>
                </div>
            </ProgressTemplate>
        </asp:UpdateProgress>
    <div id="PageList-Overview">
        <asp:Label ID="lblOverview" runat="server" />
    </div>
    <div id="PageList-TabSelect">
        <table id="PageList-ctlTabs" class="Normal">
            <tr>
                <th align="left"><dnn:Label ID="lblTabsHeader" runat="server" ResourceKey="TabsHeader"/></th>
            </tr>
            <tr>
                    <td valign="top" class="listCol">
                    <div class="tabsListCont">
                        <ifty:TabSingleSelect id="ctlTabs" runat="server" cssClass="tabsList" AutoPostback="true" />
                    </div>
                </td>
            </tr>
            <tr>
                <td>
                    <asp:CheckBox ID="chkShowDeleted" runat="server" Checked="false" AutoPostBack="true"/>
                </td>
            </tr>
        </table>    
        <asp:HiddenField ID="hdnTabId" runat="server" />
        <div id="PageList-Details">
        <div>
            <span class="fieldLabelFull">
                <dnn:Label ID="lblPageUrlLabel" runat="server" ResourceKey="PageUrl"/>
            </span>
            <span class="fieldValueWide">
                    <asp:HyperLink ID="hlPageUrl" runat="server" Target="_new" />
                </span>
            <div class="fieldOptionFtr"></div>
        </div>
        <div class="fieldOption" id="permanentRedirect" runat="server">
            <span class="fieldLabel">
                    <dnn:Label ID="lblPermanentRedirectLabel" runat="server" ResourceKey="PermanentRedirect" />
            </span>
            <span class="fieldValue">
                    <asp:HyperLink ID="hlRedirectUrl" runat="server" Target="_new" />
                </span>
                <div class="fieldOptionFtr"></div>
        </div>   
        <!-- show/hide page details -->
        <div id="PageList-MoreDetail">
            <div class="showHideLink">
                <a href="#" id="toggleLink">
                    <span id="spHideLink" runat="server" class="hideLink"/>
                    <span id="spShowLink" runat="server" class="showLink" style="display:none;"/>
                </a>
            </div>
            <div class="tabFieldOption">
                <span class="tabFieldLabel">
                    <dnn:Label ID="lblTabNameLabel" runat="server" EnableViewState="false" ResourceKey="TabName"/>
                </span>
                <span class="fieldValue">
                        <asp:Label ID="lblTabName" runat="server" />
                </span>
                <div class="fieldOptionFtr"></div>
            </div>
            <div class="tabFieldOption">
                <span class="tabFieldLabel">
                                <dnn:Label ID="lblHiddenLabel" runat="server" EnableViewState="false" ResourceKey="IsHidden"/>
                </span>
                <span class="fieldValue">
                                <asp:Label ID="lblIsHidden" runat="server" />
                </span>
                <div class="fieldOptionFtr"></div>
            </div>
            <div class="tabFieldOption">
                <span class="tabFieldLabel">
                                <dnn:Label ID="lblDeletedLabel" runat="server" EnableViewState="false" ResourceKey="IsDeleted"/>
                </span>
                <span class="fieldValue">
                                <asp:Label ID="lblIsDeleted" runat="server" />
                </span>
                <div class="fieldOptionFtr"></div>
            </div>
            <div class="tabFieldOption">
                <span class="tabFieldLabel">
                                <dnn:Label ID="lblGenerateFriendlyUrlLabel" runat="server" EnableViewState="false" ResourceKey="GenerateFriendlyUrl"/>
                </span>
                <span class="fieldValueWide">
                                <asp:RadioButtonList id="optGenerateFriendlyUrl" runat="server" RepeatLayout="Flow" RepeatDirection="Horizontal" AutoPostBack="true">
                                    <asp:ListItem Value="True" />
                                    <asp:ListItem Value="False" />
                                </asp:RadioButtonList>
                </span>
                <div class="fieldOptionFtr"></div>
            </div>
            <div class="tabFieldOption">
                <span class="tabFieldLabel">
                                <dnn:Label ID="lblPostProcessFriendlyUrlLabel" runat="server" EnableViewState="false" ResourceKey="PostProcessFriendlyUrl"/>
                </span>
                <span class="fieldValueWide">
                                <asp:RadioButtonList id="optPostProcessFriendlyUrl" runat="server" RepeatLayout="Flow" RepeatDirection="Horizontal" AutoPostBack="true">
                                    <asp:ListItem Value="True" />
                                    <asp:ListItem Value="False" />
                                </asp:RadioButtonList>
                </span>
                <div class="fieldOptionFtr"></div>
            </div>
            <div class="tabFieldOption">
                <span class="tabFieldLabel">
                                <dnn:Label ID="lblDoNotRedirect" runat="server" EnableViewState="false" ResourceKey="DoNotRedirect" />
                </span>
                <span class="fieldValueWide">
                                <asp:RadioButtonList id="optAllowRedirect" runat="server" RepeatLayout="Flow" RepeatDirection="Horizontal" AutoPostBack="true">
                                    <asp:ListItem Value="True" />
                                    <asp:ListItem Value="False" />
                                </asp:RadioButtonList>
                </span>
                <div class="fieldOptionFtr"></div>
            </div>
	    </div>
    </div>
    </div>    
		<div class="fieldOption">
			<table class="Normal" id="urlActions">
				<tr>
					<th><input type="checkbox" disabled="disabled"/></th>
					<th>Url</th>
					<th>Culture</th>
					<th>Http Action</th>
				</tr>
				<asp:Repeater ID="rptFriendlyURLs" runat="server">
					<ItemTemplate>
						<tr>            
							<td><asp:CheckBox ID="chkSelect" runat="server" />
							</td>
							<td class="urlCol">
								<asp:HiddenField ID="hdnKey" runat="server" />
								<asp:Label ID="lblFriendlyUrl" runat="server" />
								<asp:Label ID="lblAlias" runat="server" CssClass="httpAlias" />
								<asp:Label ID="lblScheme" runat="server" CssClass="httpScheme" />
								<asp:DropDownList ID="ddlAlias" runat="server" CssClass="httpAliasList"/>
								<asp:TextBox ID="txtFriendlyUrl" runat="server" />
								<div class="showHideCont showHideUp">
									<a href="#" class="showHide" /><asp:Image ID="imgShowHide" runat="server" alt="Show/Hide"/></a>
								</div>
								<div class="portalAliasUsage" style="display:none;">
									<dnn:Label ID="lblCustomAliasOption" runat="server" Text="Portal Alias Usage" ResourceKey="CustomPortalAliasUsage" EnableViewState="false" Visible="false" style="font-size:10px;"/>                            
									<asp:RadioButtonList ID="optCustomPortalAliasUsage" runat="server" CausesValidation="false" RepeatDirection="Horizontal" Visible="false"/>
								</div>
								<div class="urlDisplay">
									<dnn:Label ID="lblEncodedCaption" runat="server" Text="Encoded" EnableViewState="false" visible="false"/>                            
									<asp:Label ID="lblEncoded" runat="server" Visible="false" EnableViewState="false" />
								</div>
							</td>
							<td valign="top" class="actionCol" id="cultureCol" runat="server">
								<asp:DropDownList id="lstCultureCode" runat="server" AutoPostBack="true" OnSelectedIndexChanged="lstCultureCode_OnSelectedIndexChanged" />
							</td>
							<td valign="top" class="actionCol" id="actionCol" runat="server">
								<asp:DropDownList ID="lstAction" runat="server" AutoPostBack="true" OnSelectedIndexChanged="lstAction_OnSelectedIndexChanged"/>
							</td>
											
						</tr>
					</ItemTemplate>
				</asp:Repeater>
			</table>
			<asp:Button ID="btnAddNew" runat="server" CssClass="Normal" CausesValidation="false" UseSubmitBehavior ="false"/>
            <asp:Button ID="btnCheck" runat="server" CssClass="Normal" CausesValidation="false" UseSubmitBehavior ="false"/>
            <asp:Button ID="btnDelete" runat="server"  CssClass="Normal" CausesValidation="false" UseSubmitBehavior="false"/>
            <dnn:Label ID="lblWarnings" runat="server" EnableViewState="false" ResourceKey="AddUrlHelp"/>
            <div class="redirectsSave">
                <asp:Button ID="btnSaveRedirects" runat="server" CssClass="Normal" CausesValidation="false" UseSubmitBehavior="false"/><dnn:Label id="lblSaveRedirectsOnly" runat="server" ResourceKey="SaveRedirectsOnlyHelp"/>
            </div>
		</div>
        </ContentTemplate>
    </asp:UpdatePanel>
    </asp:Panel>
</div>
<div id="portalSettings">
<asp:Panel ID="urlMaster_PortalSettings" runat="server" CssClass="portalSettingsCont">

    <div class="fieldOption">
        <span class="fieldLabel">
            <dnn:Label ID="lblReplaceSpaces" runat="server" EnableViewState="false" ResourceKey="ReplaceSpaces" CssClass="Normal"/>
        </span>
        <span class="fieldValue">
            <asp:CheckBox ID="chkReplaceSpaces" runat="server" CssClass="Normal"/><asp:TextBox ID="txtReplaceSpaceWith" runat="server" CssClass="Normal" Width="20px"/> 
            <ifty:PropertySource id="ctlReplaceSpaces" runat="server" CssClass="propertySourceCb"/>
        </span>
        <div class="fieldOptionFtr"></div>
    </div>
    <div class="fieldOption">
        <span class="fieldLabelFull">
            <dnn:Label ID="lblPageExtensionUsage" runat="server"  EnableViewState="false" ResourceKey="PageExtensionUsage"/>
        </span>
        <span class="fieldValueWide">
            <asp:RadioButtonList ID="optPageExtensionUsage" runat="server" AutoPostBack="false" CssClass="Normal" >
                <asp:ListItem Text="Always Use Page Extension" Value="Always" />
                <asp:ListItem Text="Never Use Page Extension" Value="Never"/>
                <asp:ListItem Text="Only for Pages" Value="PageOnly"  />
            </asp:RadioButtonList> 
            <ifty:PropertySource id="ctlPageExtensionUsage" runat="server" CssClass="propertySourceOpt"/>
        </span>
        <div class="fieldOptionFtr"></div>
    </div>
    <div class="fieldOption" id="pageExtension">
        <span class="fieldLabel">
            <dnn:Label ID="lblPageExtension" runat="server" EnableViewState="false" ResourceKey="PageExtension"/>
        </span>
        <span class="fieldValue">
            <asp:TextBox ID="txtPageExtension" runat="server" CssClass="Normal"/>
            <ifty:PropertySource id="ctlPageExtension" runat="server" CssClass="propertySourceTb"/>
        </span>
        <div class="fieldOptionFtr"></div>
    </div>
    <div class="fieldOption">
        <span class="fieldLabel">
            <dnn:Label ID="lblRedirectUnfriendly" runat="server" EnableViewState="false" ResourceKey="RedirectUnfriendly"/>
        </span>
        <span class="fieldValue">
            <asp:Checkbox ID="chkRedirectUnfriendly" runat="server" CssClass="Normal" />
            <ifty:PropertySource id="ctlRedirectUnfriendly" runat="server" CssClass="propertySourceCb"/>
        </span>
        <div class="fieldOptionFtr"></div>
    </div>
    <div class="fieldOption">
        <span class="fieldLabelFull">
            <dnn:Label id="lblPortalAliasUsage" runat="server" CssClass="Normal" ResourceKey="PortalAliasUsage" />
        </span>
        <span class="fieldValueWide">
            <div class="fieldOptionFtr"></div>
            <asp:RadioButtonList ID="optPortalAliasUsage" runat="server" CssClass="Normal" RepeatLayout="Flow">
                <asp:ListItem Value="Any" />
                <asp:ListItem Value="One" />
                <asp:ListItem Value="Culture" />
            </asp:RadioButtonList>
            <div class="fieldOptionFtr"></div>
            <asp:HiddenField ID="hdnSelectedAlias" runat="server" />
            <asp:Repeater ID="rptPortalAliases" runat="server" >
                <HeaderTemplate>
                    <div class="aliasDetailHdr">
                        <asp:Label id="lblAliasCheckHdr" runat="server" CssClass="aliasCheckHdr" />
                        <asp:Label id="lblCultureCodeHdr" runat="server" CssClass="aliasCultureListHdr" />
                        <asp:Label id="lblAliasHdr" runat="server" CssClass="aliasValueHdr" />
                    </div>
                </HeaderTemplate>
                <ItemTemplate>
                    <div class="aliasDetail">
                        <asp:CheckBox ID="chkUseAlias" runat="server" CssClass="aliasCheck" />
                        <asp:RadioButton ID="optUseAlias" runat="server" CssClass="aliasOption"  name="aliasOption" />
                        <asp:DropDownList ID="ddlCultureCode" runat="server" CssClass="Normal aliasCultureList" />
                        <asp:Label ID="lblAlias" runat="server" CssClass="aliasValue" />
                    </div>
                </ItemTemplate>
            </asp:Repeater>
        </span>
        <div class="fieldOptionFtr"></div>
    </div>    
    <div class="fieldOption">
        <span class="fieldLabelFull">
            <dnn:Label id="lblUserProfileAction" runat="server" ResourceKey="UserProfileAction" />
        </span>
        <span class="fieldValueWide">
            <asp:RadioButtonList ID="optUserProfileAction" runat="server">
                <asp:ListItem Value="None" Selected="True"/>
                <asp:ListItem Value="AllTabs" />
                <asp:ListItem Value="ThisTab" />
            </asp:RadioButtonList>
        </span>
        <div class="fieldOptionFtr"></div>
    </div>    
    <div class="fieldOption" id="userProfileTab">
        <span class="fieldLabel">
            <dnn:Label ID="lblUserProfilePage" runat="server" ResourceKey="UserProfilePage"/>
        </span>
        <span class="fieldValue">
            <ifty:TabSingleSelect id="ctlUserProfileTab" runat="server" CssClass="tabSingleSelect" />
        </span>
        <div class="fieldOptionFtr"></div>
    </div>     
    <div class="fieldOption" id="userProfileType">
        <span class="fieldLabel">
            <dnn:Label id="lblUserProfileType" runat="server" ResourceKey="UserProfileType" />
        </span>
        <span class="fieldValue">
            <asp:RadioButtonList ID="optProfileType" runat="server" RepeatDirection="Vertical">
                <asp:ListItem Value="Username" Selected="true"/>
                <asp:ListItem Value="DisplayName" />
            </asp:RadioButtonList>
        </span>
        <div class="fieldOptionFtr"></div>
    </div>    
    <div class="fieldOption" id="userProfileParameter">
        <span class="fieldLabel">
            <dnn:Label id="lblUserProfileParameterHdr" runat="server" ResourceKey="UserProfileParameterHdr" />
        </span>
        <span class="fieldValue">
            <dnn:Label id="lblUserProfileParameter" runat="server" ResourceKey="UserProfileParameter"/>
            <asp:TextBox ID="txtUserProfileParameterName" runat="server" CssClass="Normal" /><br />
            <asp:RequiredFieldValidator ID="errUserProfileParameterName" runat="server" CssClass="errValidator" ControlToValidate="txtUserProfileParameterName" SetFocusOnError="true"/>
            <br />
            <dnn:Label id="lblUserProfileOtherParameter" runat="server" ResourceKey="UserProfileOtherParameter"/>
            <asp:TextBox ID="txtUserProfileOtherParameter" runat="server" CssClass="Normal" />
        </span>
        <div class="fieldOptionFtr"></div>
    </div>    
    <div class="fieldOption" id="userProfileRedirect">
        <span class="fieldLabel">
            <dnn:Label id="lblUserProfileRedirect" runat="server" ResourceKey="UserProfileRedirect"/>
        </span>
        <span class="fieldValue">
            <asp:CheckBox ID="chkUserProfileRedirect" runat="server" CssClass="Normal" />
        </span>
        <div class="fieldOptionFtr"></div>
    </div>     
    
</asp:Panel>
</div>
<div id="errors404s">
<asp:Panel ID="urlMaster_Errors404s" runat="server" CssClass="errors404sCont">

        <div class="fieldOption" >
            <span class="fieldLabelFull">
                <dnn:Label ID="lblDeletedTabHandling" runat="server" EnableViewState="false" ResourceKey="DeletedTabHandling"/>
            </span>
            <span class="fieldValueWide">
                <asp:RadioButtonList ID="optDeletedTabHandling" runat="server" CssClass="Normal" >
                    <asp:ListItem Value="Do301RedirectToPortalHome" />
                    <asp:ListItem Value="Do404Error" />
                </asp:RadioButtonList> 
                <ifty:PropertySource id="ctlDeletedTabHandling" runat="server"  CssClass="propertySourceOpt"/>
            </span>
            <div class="fieldOptionFtr"></div>
        </div> 
    <div class="fieldOption">
        <span class="fieldLabelFull">
            <dnn:Label id="lbl404Handing" runat="server" CssClass="Normal" ResourceKey="404Handling"/>
        </span>
        <span class="fieldValueWide">
            <div class="fieldOptionFtr"></div>
            <asp:RadioButtonList ID="opt404Handling" runat="server" CssClass="Normal" RepeatDirection="Vertical" RepeatLayout="Flow" />
        </span>
        <div class="fieldOptionFtr"></div>
    </div>    
    <div class="fieldOption">
        <span class="fieldLabelShort">
            <dnn:Label id="lblLog404s" runat="server" CssClass="Normal" ResourceKey="Log404" />
        </span>
        <span class="fieldValue">
            <asp:CheckBox ID="chkLog404s" runat="server" CssClass="Normal" />
        </span>
        <div class="fieldOptionFtr"></div>
        <span class="fieldLabelShort">
            <dnn:Label id="lblMax404LogSize" runat="server" CssClass="Normal" ResourceKey="Max404LogSize" />
        </span>
        <span class="fieldValue">
            <asp:TextBox ID="txtMax404LogSize" runat="server" CssClass="Normal" Width="50px" MaxLength="6"/>
        </span>
        <div class="fieldOptionFtr"></div>
    </div>    
    
    <div class="fieldOption" id="404Tabs">
        <span class="fieldLabel">
            <dnn:Label id="lbl404TabHdr" runat="server" CssClass="Normal" ResourceKey="404TabLabel"/>
        </span>
        <span class="fieldValue">
            <ifty:TabSingleSelect id="ctl404Tab" runat="server" CssClass="tabSingleSelect" />
        </span>
        <div class="fieldOptionFtr"></div>
    </div>    
    <div class="fieldOption" id="404Regex">
        <span class="fieldLabel">
            <dnn:Label id="lbl404RegexHdr" runat="server" cssClass="Normal" ResourceKey="404Regex" />
        </span>
        <span class="fieldValue">
            <asp:TextBox ID="txt404Regex" runat="server" CssClass="Normal" Width="80%" />
        </span>
        <div class="fieldOptionFtr"></div>
    </div>    
    <div class="fieldOption" id="404Url">
        <span class="fieldLabel">
            <dnn:Label id="lbl404uRL" runat="server" CssClass="Normal" ResourceKey="404UrlLabel"/>
        </span>
        <span class="fieldValue">
            <asp:TextBox id="txt404Url" runat="server" CssClass="Normal" Width="80%" />
        </span>
        <div class="fieldOptionFtr"></div>
    </div>    

   <div class="fieldOption">
        <span class="fieldLabelFull">
            <dnn:Label id="lbl500Handing" runat="server" CssClass="Normal" ResourceKey="500Handling"/>
        </span>
        <span class="fieldValueWide">
            <div class="fieldOptionFtr"></div>
            <asp:RadioButtonList ID="opt500Handling" runat="server" CssClass="Normal" RepeatDirection="Vertical"  RepeatLayout="Flow" />
        </span>
        <div class="fieldOptionFtr"></div>
    </div>    
    <div class="fieldOption" id="500Tabs">
        <span class="fieldLabel">
            <dnn:Label id="lbl500TabHdr" runat="server" CssClass="Normal" ResourceKey="500TabLabel"/>
        </span>
        <span class="fieldValue">
            <ifty:TabSingleSelect id="ctl500Tab" runat="server" CssClass="tabSingleSelect" />
        </span>
        <div class="fieldOptionFtr"></div>
    </div>    
    <div class="fieldOption" id="500Url">
        <span class="fieldLabel">
            <dnn:Label id="lbl500uRL" runat="server" CssClass="Normal" ResourceKey="500UrlLabel"/>
        </span>
        <span class="fieldValue">
            <asp:TextBox id="txt500Url" runat="server" CssClass="Normal" Width="80%" />
        </span>
        <div class="fieldOptionFtr"></div>
    </div>   
    
</asp:Panel>
</div>
<div id="advSettingsTab">
    <asp:Panel ID="urlMaster_AdvancedSettings" runat="server">
        <div class="fieldOption" >
            <span class="fieldLabel">
                <dnn:Label ID="lblForceLowerCase" runat="server" EnableViewState="false" ResourceKey="ForceLowerCase"/>
            </span>
            <span class="fieldValue">
                <asp:CheckBox ID="chkForceLowerCase" runat="server" />
                <ifty:PropertySource id="ctlForceLowerCase" runat="server" CssClass="propertySourceCb"/>
            </span>
            <div class="fieldOptionFtr"></div>
        </div>     
        <div class="fieldOption" >
            <span class="fieldLabel">
                <dnn:Label ID="lblRedirectWrongCase" runat="server" EnableViewState="false" ResourceKey="RedirectWrongCase"/>
            </span>
            <span class="fieldValue">
                <asp:CheckBox id="chkRedirectWrongCase" runat="server" />
                <ifty:PropertySource id="ctlRedirectWrongCase" runat="server" CssClass="propertySourceCb"/>
            </span>
            <div class="fieldOptionFtr"></div>
        </div>     
        <div class="fieldOption" >
            <span class="fieldLabelFull">
                <dnn:Label id="lblSpaceEncodingValue" runat="server" EnableViewState="false" ResourceKey="SpaceEncodingValue"/>
            </span>
            <span class="fieldValueWide">
                <asp:RadioButtonList ID="optSpaceEncoding" runat="server"  CssClass="Normal">
                    <asp:ListItem Value="%20" />
                    <asp:ListItem Value="+" />
                </asp:RadioButtonList>
                <ifty:PropertySource id="ctlSpaceEncoding" runat="server" CssClass="propertySourceOpt"/>
            </span>
            <div class="fieldOptionFtr"></div>
        </div>     
        <div class="fieldOption" >
            <span class="fieldLabel">
                <dnn:Label ID="lblAutoAsciiConversion" runat="server"  EnableViewState="false" ResourceKey="AutoAsciiConversion"/>
            </span>
            <span class="fieldValue">
                <asp:CheckBox ID="chkAutoAsciiConvert" runat="server" />
                <ifty:PropertySource id="ctlAutoAsciiConvert" runat="server" CssClass="propertySourceCb"/>
            </span>
            <div class="fieldOptionFtr"></div>
        </div>     
        <div class="fieldOption" >
            <span class="fieldLabel">
                <dnn:Label ID="lblCheckForDupUrls" runat="server" EnableViewState="false" ResourceKey="CheckForDupUrls"/>
            </span>
            <span class="fieldValue">
                <asp:CheckBox ID="chkForDupUrls" runat="server" />
                <ifty:PropertySource id="ctlCheckForDupUrls" runat="server" CssClass="propertySourceCb" />
            </span>
            <div class="fieldOptionFtr"></div>
        </div>     
        <div class="fieldOption" >
            <span class="fieldLabel">
                <dnn:Label ID="lblRedirectDefaultPage" runat="server" EnableViewState="false" ResourceKey="RedirectDefaultPage"/>
            </span>
            <span class="fieldValue">
                <asp:CheckBox id="chkRedirectDefaultPage" runat="server" AutoPostBack="true" />
                <div id="defaultRedirectConfirm" runat="server" visible="false" class="confirmMessage">
                    <asp:Image ID="imgDefaultRedirectConfirm" runat="server" CssClass="Normal" Visible="False"/>
                    <asp:Label ID="lblDefaultRedirectConfirm" runat="server" CssClass="Normal" Visible="False"/>
                    <div class="confirmButton">
                        <button id="btnDefaultRedirectConfirm" runat="server"  />
                    </div>
                </div>
                <ifty:PropertySource id="ctlRedirectDefaultPage" runat="server" CssClass="propertySourceCb"/>
            </span>
            <div class="fieldOptionFtr"></div>
        </div>     
        <div class="fieldOption" >
            <span class="fieldLabel">
                <dnn:Label ID="lblClientSslRedirect" runat="server" EnableViewState="false" ResourceKey="ClientSslRedirect"/>
            </span>
            <span class="fieldValue">
                <asp:CheckBox ID="chkClientSSLRedirect" runat="server"/>
                <ifty:PropertySource id="ctlClientSSLRedirect" runat="server" CssClass="propertySourceCb"/>
            </span>
            <div class="fieldOptionFtr"></div>
        </div>     
        <div class="fieldOption" >
            <span class="fieldLabel">
                <dnn:Label ID="lblRebaseClientUrl" runat="server" EnableViewState="false" ResourceKey="RebaseClientUrl"/>
            </span>
            <span class="fieldValue">
                <asp:CheckBox ID="chkRebaseClientUrl" runat="server"/>
                <ifty:PropertySource id="ctlRebaseClientUrl" runat="server" CssClass="propertySourceCb"/>
            </span>
            <div class="fieldOptionFtr"></div>
        </div>     
        <div class="fieldOption" >
            <span class="fieldLabel">
                <dnn:Label ID="lblForcePortalDefaultLanguage" runat="server" EnableViewState="false" ResourceKey="ForcePortalDefaultLanguage"/>
            </span>
            <span class="fieldValue">
                <asp:CheckBox ID="chkForcePortalDefaultLanguage" runat="server"/>
                <ifty:PropertySource id="ctlForcePortalDefaultLanguage" runat="server" CssClass="propertySourceCb"/>
            </span>
            <div class="fieldOptionFtr"></div>
        </div>     
        <div class="fieldOption" >
            <span class="fieldLabel">
                <dnn:Label ID="lblFriendlyAdminHostUrls" runat="server" EnableViewState="false" ResourceKey="FriendlyAdminHostUrls"/>
            </span>
            <span class="fieldValue">
                <asp:CheckBox ID="chkFriendlyAdminHostUrls" runat="server"/>
                <ifty:PropertySource id="ctlFriendlyAdminHostUrls" runat="server" CssClass="propertySourceCb"/>
            </span>
            <div class="fieldOptionFtr"></div>
        </div>             
        <div class="fieldOption" >
            <span class="fieldLabelFull">
                <dnn:Label ID="lblForwardExternalUrls" runat="server" EnableViewState="false" CssClass="Normal" ResourceKey="ForwardExternalUrls"/>
            </span>
            <span class="fieldValueWide">
                <asp:RadioButtonList ID="optForwardExternalUrls" runat="server" CssClass ="normal" >
                    <asp:ListItem Selected="true" Value="Redirect301"/>
                    <asp:ListItem Selected="false" Value="NoForward" />
                    <asp:ListItem Selected="false" Value="Redirect302"/>
                </asp:RadioButtonList>
                <ifty:PropertySource id="ctlForwardExternalUrls" runat="server" CssClass="propertySourceOpt" />
            </span>
            <div class="fieldOptionFtr"></div>
        </div>  
        <div class="fieldOption">
            <span class="fieldLabel">
                <dnn:Label ID="lblPageListSize" runat="server" EnableViewState="false" ResourceKey="PageListSize"/>
            </span>
            <span class="fieldValue">
                <asp:TextBox ID="txtPageListSize" runat="server" CssClass="Normal" />
                <ifty:PropertySource id="ctlPageListSize" runat="server" CssClass="propertySource"/>
            </span>
            <div class="fieldOptionFtr"></div>
        </div>              
    </asp:Panel>
</div>
<div id="regexSettingsTab">
    <asp:Panel ID="urlMaster_RegexSettings" runat="server">
        <div class="fieldOption">
			<dnn:Label ID="lblRegexSettingsHdr" runat="server" EnableViewState="false" ResourceKey="RegexSettings"/>
		</div>
        <div class="fieldOption">
            <span class="fieldLabelWide">
                <dnn:Label ID="lblIgnoreRegex" runat="server" EnableViewState="false" ResourceKey="IgnoreRegex"/>
            </span>
            <span class="fieldValueWide">
                <asp:TextBox ID="txtIgnoreRegex" runat="server" CssClass="regexTb"/>
                <ifty:PropertySource id="ctlIgnoreRegex" runat="server" />
            </span>
            
            <div class="fieldOptionFtr"></div>
        </div> 
        <div class="fieldOption">
            <span class="fieldLabelWide">
                <dnn:Label ID="lblDoNotRewriteRegex" runat="server" EnableViewState="false" ResourceKey="DoNotRewriteRegex"/>
		    </span>
		    <span class="fieldValueWide">
	            <asp:TextBox ID="txtDoNotRewriteRegex" runat="server" CssClass="regexTb"/> 
	            <ifty:PropertySource id="ctlDoNotRewriteRegex" runat="server" />    
            </span>
            <div class="fieldOptionFtr"></div>
        </div> 
        <div class="fieldOption">
            <span class="fieldLabelWide">
                <dnn:Label ID="lblUseSiteUrlsRegex" runat="server" EnableViewState="false" ResourceKey="UseSiteUrlsRegex"/>
		    </span>
		    <span class="fieldValueWide">
	            <asp:TextBox ID="txtUseSiteUrlsRegex" runat="server" CssClass="regexTb"/> 
                <ifty:PropertySource id="ctlUseSiteUrlsRegex" runat="server" />
            </span>
            <div class="fieldOptionFtr"></div>
        </div> 
        <div class="fieldOption">
            <span class="fieldLabelWide">
                <dnn:Label ID="lblDoNotRedirectRegex" runat="server" EnableViewState="false" ResourceKey="DoNotRedirectRegex"/>
    		</span>
	    	<span class="fieldValueWide">
            	<asp:TextBox ID="txtDoNotRedirectRegex" runat="server" CssClass="regexTb"/> 
                <ifty:PropertySource id="ctlDoNotRedirectRegex" runat="server" />
            </span>
            <div class="fieldOptionFtr"></div>
        </div>
        <div class="fieldOption">
	        <span class="fieldLabelWide">
                <dnn:Label ID="lblDoNotRedirectSecureRegex" runat="server" EnableViewState="false" ResourceKey="DoNotRedirectSecureRegex"/>
		    </span>
		    <span class="fieldValueWide">
        	    <asp:TextBox ID="txtDoNotRedirectSecureRegex" runat="server" CssClass="regexTb"/>
                <ifty:PropertySource id="ctlDoNotRedirectSecureRegex" runat="server" />
		    </span>
		    <div class="fieldOptionFtr"></div>
	    </div>        
        <div class="fieldOption">
	        <span class="fieldLabelWide">
                <dnn:Label ID="lblForceLowerCaseRegex" runat="server" EnableViewState="false" ResourceKey="ForceLowerCaseRegex"/>
		    </span>
		    <span class="fieldValueWide">
	            <asp:TextBox ID="txtForceLowerCaseRegex" runat="server" CssClass="regexTb"/>
                <ifty:PropertySource id="ctlForceLowerCaseRegex" runat="server" />
		    </span>
		    <div class="fieldOptionFtr"></div>
	    </div>        
        <div class="fieldOption">
        	<span class="fieldLabelWide">
                <dnn:Label ID="lblNoFriendlyUrlRegex" runat="server" EnableViewState="false" ResourceKey="NoFriendlyUrlRegex"/>
		    </span>
		    <span class="fieldValueWide">
        	    <asp:TextBox ID="txtNoFriendlyUrlRegex" runat="server" CssClass="regexTb"/>
                <ifty:PropertySource id="ctlNoFriendlyUrlRegex" runat="server" />
		    </span>
		    <div class="fieldOptionFtr"></div>
	    </div>        
        <div class="fieldOption">
        	<span class="fieldLabelWide">
                <dnn:Label ID="lblDoNotIncludeInPathRegex" runat="server" EnableViewState="false" ResourceKey="DoNotIncludeInPathRegex" />
	        </span>
	        <span class="fieldValueWide">
                <asp:TextBox ID="txtDoNotIncludeInPathRegex" runat="server" CssClass="regexTb"/>
    		    <ifty:PropertySource id="ctlDoNotIncludeInPathRegex" runat="server" />
		    </span>
		    <div class="fieldOptionFtr"></div>
	    </div>        
        <div class="fieldOption">
	        <span class="fieldLabelWide">
                <dnn:Label ID="lblTriggerDictionaryRebuildRegex" runat="server" EnableViewState="false" ResourceKey="TriggerDictionaryRebuildRegex"/>
	        </span>
		    <span class="fieldValueWide">
	            <asp:TextBox ID="txtTriggerDictionaryRebuildRegex" runat="server" CssClass="regexTb"/>
                <ifty:PropertySource id="ctlTriggerDictionaryRebuildRegex" runat="server" />
		    </span>
		    <div class="fieldOptionFtr"></div>
	    </div>                
    </asp:Panel>
</div>
<div id="testUrls">
    <asp:Panel ID="urlMaster_TestUrls" runat="server" CssClass="urlMaster_TestUrls">
    <asp:UpdatePanel id="updPanelTestUrls" runat="server">
        <ContentTemplate>
        <asp:UpdateProgress id="updProgressTestUrls" runat="server" DynamicLayout="true" AssociatedUpdatePanelID="updPanelTestUrls" Visible="true" >
            <ProgressTemplate>
                <div id="testWaiting">
                    <img id="imgProgress" runat="server" src="images/loading.gif" alt="Generating Test Urls..."/>
                </div>
            </ProgressTemplate>
        </asp:UpdateProgress>
        <div class="fieldOption">
            <span class="fieldValueWide">
                <dnn:Label id="lblSelectTestPage" runat="server" CssClass="Normal" ResourceKey="SelectTestPage" />
                <ifty:TabSingleSelect id="ctlTestPages" runat="server" CssClass="exampleTestPages" />
                <div class="testBox" >
                        <dnn:Label ID="lblExampleQueryString" runat="server" ResourceKey="ExampleQueryString"/>
                        <asp:TextBox ID="txtExampleQueryString" runat="server" width="95%"/><br />
                        <dnn:Label ID="lblExamplePageName" runat="server" ResourceKey="ExamplePageName"/>
                        <asp:TextBox ID="txtExamplePageName" runat="server" Width="95%" />
                        <asp:Button ID="btnSeeExample" runat="server" CssClass="Normal" CausesValidation="false" UseSubmitBehavior="false"/>
                </div>
                <div class="testResult">
                    <dnn:Label ID="lblExampleResult" runat="server" ResourceKey="ExampleResult"/>
                    <asp:Repeater ID="rptFriendlyUrlExample" runat="server" >
                        <ItemTemplate>
                        <div class="friendlyUrlTestResults">
                            <asp:Label ID="lblFriendlyUrlExample" runat="server" EnableViewState="true" CssClass="friendlyUrlExample" Text=""/>
                            <br />
                            <a id="copyLink" runat="server" class="copyToTestRewrite" enableviewstate="true" />
                            <asp:Label ID="lblMessages" CssClass="friendlyUrlMessages" runat="server" EnableViewState="false"/>
                        </div>
                        </ItemTemplate>
                    </asp:Repeater>
                </div>
                
            </span>
            <div class="fieldOptionFtr"></div>
        </div> 
        <div class="fieldOption">
            <div class="testRewriting">
                <div class="fieldValueWide">
                    <dnn:Label ID="lblTestRewriteHeader" runat="server" EnableViewState="false" ResourceKey="TestRewriteHeader" />
                    <dnn:Label ID="lblTestRewrite" runat="server" EnableViewState="false" ResourceKey="TestRewrite"/>
                    <div class="testRewriteBox">
                        <asp:TextBox ID="txtTestRewrite" runat="server" CssClass="exampleTb" Width="95%"/>
                        <asp:Button ID="btnTestRewrite" runat="server" CssClass="Normal" CausesValidation='false' UseSubmitBehavior="false"/>
                    </div>
            
                    <span class="fieldLabel">
                        <dnn:Label ID="lblRewriteResultsLabel" runat="server" EnableViewState="false" ResourceKey="RewriteResults"/>
                    </span>
                    <span class="testResultValue">
                        <asp:Label ID="lblRewriteResults" runat="server" EnableViewState="false" />
                    </span>
                    <div class="fieldOptionFtr"></div>
                    <span class="fieldLabel">
                        <dnn:Label ID="lblLanguageResultsCultureLabel" runat="server" EnableViewState="false" ResourceKey="LanguageCultureResults"/>
                    </span>
                    <span class="testResultValue">
                        <asp:Label ID="lblLanguageCultureResults" runat="server" EnableViewState="false" />
                    </span>
                    <div class="fieldOptionFtr"></div>                    
                    <span class="fieldLabel">
                        <dnn:Label ID="lblTabNameResultsLabel" runat="server" EnableViewState="false" ResourceKey="TabNameResults"/>
                    </span>
                    <span class="testResultValue">
                        <asp:Label ID="lblTabNameResults" runat="server" EnableViewState="false" />
                    </span>
                    <div class="fieldOptionFtr"></div>
                    <span class="fieldLabel">
                        <dnn:Label ID="lblRedirectResultsLabel" runat="server" EnableViewState="false" ResourceKey="RedirectResults" />            
                        
                    </span>
                    <span class="testResultValue">
                        <div class="testResultDetail">
                            <asp:Label ID="lblRedirectResults" runat="server" EnableViewState="false" CssClass="friendlyUrlMessages"/>
                            <br />
                            <asp:Label id="lblRedirectUrl" runat="server" EnableViewState="false" CssClass="friendlyUrlExample" />
                            <a id="copyLink" runat="server" class="copyToTestRewrite" enableviewstate="false" />
                            
                        </div>
                    </span>
                    <div class="fieldOptionFtr"></div>
                    <span class="fieldLabel">
                           <dnn:Label ID="lblRewriteMessageLabel" runat="server" EnableViewState="false" ResourceKey="RewriteMessage"/>
                    </span>
                    <span class="testResultValue">
                        <div class="testResultDetail">
                            <asp:Label ID="lblRewriteMessage" runat="server" EnableViewState="false" />
                        </div> 
                    </span>
                    <div class="fieldOptionFtr"></div>
                </div>
            </div>
            <div class="fieldOptionFtr"></div>
        </div>
    </ContentTemplate>
    </asp:UpdatePanel>
    </asp:Panel>
</div>
</div>
<div id="pageExtDialog" class="pageExtDialog fieldOption" runat="server" >
    <asp:Label ID="lblPageExtensionWarning" runat="server" />
</div>
<div id="defaultRedirectDialog" class="defaultRedirectDialog fieldOption" runat="server" >
    <asp:Label ID="lblDefaultRedirectWarning" runat="server" />
</div>
<div id="messages" class="fieldOption">
    <asp:Label ID="lblMessages" runat="server" CssClass="Normal" EnableViewState="false"/>
    <asp:RequiredFieldValidator ID="errUserProfileParameterName2" runat="server" CssClass="errValidator" ControlToValidate="txtUserProfileParameterName" EnableClientScript="true"/>
</div>
<div id="pageListButtons" class="fieldOption">
    <asp:Button ID="btnSave" runat="server"  UseSubmitBehavior="false"/>
    <asp:Button ID="btnDiscard" runat="server" CausesValidation="false" UseSubmitBehavior="false" />
    <ifty:SaveMessage id="ctlSaveMessage" runat="server" />
</div>
<div id="returnLink" class="fieldOption">
    <asp:HyperLink ID="hlSite404Log" runat="server" CssClass="Normal" />
    <asp:HyperLink id="hlFriendlyUrlSettings" runat="server" CssClass="Normal" />
</div>
