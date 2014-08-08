<%@ Control Language="vb" AutoEventWireup="false" CodeBehind="NewsArchivesOptions.ascx.vb" Inherits="Ventrian.NewsArticles.NewsArchivesOptions" %>
<%@ Register TagPrefix="dnn" TagName="Label" Src="~/controls/LabelControl.ascx" %>
<table cellSpacing="0" cellPadding="2" summary="Edit Links Design Table" border="0">
	<TR vAlign="top">
		<TD class="SubHead" width="150">
			<dnn:label id="plModuleID" runat="server" resourcekey="Module" suffix=":" controlname="drpModuleID"></dnn:label></TD>
		<TD align="left" width="325">
			<asp:dropdownlist id="drpModuleID" Runat="server" Width="325" 
                datavaluefield="ModuleID" datatextfield="ModuleTitle" 
				CssClass="NormalTextBox" AutoPostBack="True"></asp:dropdownlist></TD>
	</TR>
	<TR vAlign="top">
		<TD class="SubHead" width="150"><dnn:label id="Mode" controlname="rdoMode" suffix=":" resourcekey="Mode" runat="server"></dnn:label></TD>
		<TD align="left" width="325"><asp:radiobuttonlist id="rdoMode" RepeatLayout="Flow" RepeatDirection="Horizontal" AutoPostBack="True"
				CssClass="Normal" Width="325" Runat="server"></asp:radiobuttonlist></TD>
	</TR>
	<TR id="trHideZeroCategories" vAlign="top" runat="server" visible="true">
		<TD class="SubHead" width="150"><dnn:label id="plHideZeroCategories" controlname="chkHideZeroCategories" suffix=":" resourcekey="HideZeroCategories"
				runat="server"></dnn:label></TD>
		<TD align="left" width="325"><asp:checkbox id="chkHideZeroCategories" Runat="server"></asp:checkbox></TD>
	</TR>
	<tr id="trParentCategory" valign="top" runat="server">
		<td class="SubHead" width="150"><dnn:label id="plParentCategory" controlname="drpParentCategory" suffix=":" resourcekey="ParentCategory"
				runat="server"></dnn:label></td>
		<td align="left" width="325"><asp:DropDownList ID="drpParentCategory" Runat="server" DataTextField="NameIndented" DataValueField="CategoryID" /></td>
	</tr>
	<tr id="trMaxDepth" valign="top" runat="server">
		<td class="SubHead" width="150"><dnn:label id="plMaxDepth" controlname="txtMaxDepth" suffix=":" resourcekey="MaxDepth"
				runat="server"></dnn:label></td>
		<td align="left" width="325">
		    <asp:textbox id="txtMaxDepth" Runat="server" Width="50" CssClass="NormalTextBox" /> 
		    <asp:Label ID="lblMaxDepthBlank" runat="server" CssClass="Normal" ResourceKey="MaxDepthBlank" />
	        <asp:CompareValidator id="valMaxDepth" runat="server" ResourceKey="valMaxDepth.ErrorMessage" ErrorMessage="<br>* Must be a Number"
		        Display="Dynamic" ControlToValidate="txtMaxDepth" Type="Integer" Operator="DataTypeCheck" CssClass="NormalRed"></asp:CompareValidator>
        </td>
	</tr>
	<tr id="trAuthorSortBy" vAlign="top" runat="server" visible="true">
		<td class="SubHead" width="150"><dnn:label id="plAuthorSortBy" runat="server" controlname="lstAuthorSortBy" suffix=":"></dnn:label></td>
		<td valign="bottom">
			<asp:RadioButtonList ID="lstAuthorSortBy" Runat="server" RepeatDirection="Horizontal" CssClass="Normal" RepeatLayout="Flow" RepeatColumns="3" />
		</td>
	</tr>
	<tr id="trGroupBy" runat="Server">
		<td class="SubHead" width="150"><dnn:label id="plGroupBy" runat="server" controlname="lstGroupBy" suffix=":"></dnn:label></td>
		<td valign="bottom">
			<asp:RadioButtonList ID="lstGroupBy" Runat="server" RepeatDirection="Horizontal" CssClass="Normal" RepeatLayout="Flow" />
		</td>
	</tr>
	<tr>
		<td class="SubHead" width="150"><dnn:label id="plLayoutMode" runat="server" controlname="lstLayoutMode" suffix=":"></dnn:label></td>
		<td valign="bottom">
			<asp:RadioButtonList ID="lstLayoutMode" Runat="server" RepeatDirection="Horizontal" CssClass="Normal" RepeatLayout="Flow"
				AutoPostBack="True" />
		</td>
	</tr>
	<TR vAlign="top">
		<TD class="SubHead" width="150"><dnn:label id="plHtmlHeader" controlname="txtHtmlHeader" suffix=":" resourcekey="HtmlHeader"
				runat="server"></dnn:label></TD>
		<TD align="left" width="325"><asp:textbox id="txtHtmlHeader" runat="server" width="300" maxlength="50" TextMode="MultiLine"
				Rows="2" cssclass="NormalTextBox"></asp:textbox></TD>
	</TR>
	<TR vAlign="top">
		<TD class="SubHead" width="150"><dnn:label id="plHtmlBody" controlname="txtHtmlBody" suffix=":" resourcekey="HtmlBody" runat="server"></dnn:label></TD>
		<TD align="left" width="325"><asp:textbox id="txtHtmlBody" runat="server" width="300" maxlength="50" TextMode="MultiLine"
				Rows="6" cssclass="NormalTextBox"></asp:textbox></TD>
	</TR>
	<TR vAlign="top">
		<TD class="SubHead" width="150"><dnn:label id="plHtmlFooter" controlname="txtHtmlFooter" suffix=":" resourcekey="HtmlFooter"
				runat="server"></dnn:label></TD>
		<TD align="left" width="325"><asp:textbox id="txtHtmlFooter" runat="server" width="300" maxlength="50" TextMode="MultiLine"
				Rows="2" cssclass="NormalTextBox"></asp:textbox></TD>
	</TR>
	<tr runat="server" id="trItemsPerRow">
		<td class="SubHead" width="150"><dnn:label id="plItemsPerRow" runat="server" controlname="txtItemsPerRow" suffix=":"></dnn:label></td>
		<td valign="bottom">
			<asp:TextBox ID="txtItemsPerRow" Runat="server" CssClass="NormalTextBox" width="250" columns="10"
				maxlength="6" /><asp:RequiredFieldValidator ID="valItemsPerRow" Runat="server" ControlToValidate="txtItemsPerRow" Display="Dynamic"
				ResourceKey="valItemsPerRow.ErrorMessage" CssClass="NormalRed" /><asp:CompareValidator ID="valItemsPerRowIsNumber" Runat="server" ControlToValidate="txtItemsPerRow" Display="Dynamic"
				ResourceKey="valItemsPerRowIsNumber.ErrorMessage" CssClass="NormalRed" Operator="DataTypeCheck" Type="Integer" />
		</td>
	</tr>
</table>
