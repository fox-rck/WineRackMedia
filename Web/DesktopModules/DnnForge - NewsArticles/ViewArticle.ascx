<%@ Control Language="vb" AutoEventWireup="false" CodeBehind="ViewArticle.ascx.vb" Inherits="Ventrian.NewsArticles.ViewArticle" %>
<%@ Register TagPrefix="Ventrian" TagName="Header" Src="ucHeader.ascx" %>
<Ventrian:Header id="ucHeader1" SelectedMenu="CurrentArticles" runat="server" MenuPosition="Top" />
<asp:Literal ID="litPingback" Runat="server" EnableViewState="False" Visible="True"></asp:Literal>
<asp:Literal ID="litRDF" Runat="server" EnableViewState="False" Visible="True"></asp:Literal>
<asp:PlaceHolder ID="phArticle" runat="server" />
<Ventrian:Header id="ucHeader2" SelectedMenu="CurrentArticles" runat="server" MenuPosition="Bottom" />
