Imports DotNetNuke
Imports System.Web.UI
Imports DotNetNuke.Services.Mail
Imports DotNetNuke.Entities.Modules
Imports DotNetNuke.UI.Skins
Imports System.Net.Mail
Imports System.Net
Imports DotNetNuke.Entities.Host


Namespace Modules.ContactFormClearwellRelativity

    ''' -----------------------------------------------------------------------------
    ''' <summary>
    ''' The View class displays the content
    ''' </summary>
    ''' <remarks>
    ''' </remarks>
    ''' <history>
    ''' </history>
    ''' ----------------------------------------------------------------------------
    Partial Class View
        Inherits Entities.Modules.PortalModuleBase


#Region "Event Handlers"

        'Protected Sub Page_Init(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Init
        '    Try
        '    Catch exc As Exception
        '        ProcessModuleLoadException(Me, exc)
        '    End Try
        'End Sub


        ''' -----------------------------------------------------------------------------
        ''' <summary>
        ''' Page_Load runs when the control is loaded
        ''' </summary>
        ''' <remarks>
        ''' </remarks>
        ''' <history>
        ''' </history>
        ''' -----------------------------------------------------------------------------
        Private Sub Page_Load(ByVal sender As System.Object, ByVal e As System.EventArgs) Handles MyBase.Load
            btnSubmit.Text = Settings("submitText")
        End Sub


#End Region

        Protected Sub submitbtn_Click(ByVal sender As Object, ByVal e As System.EventArgs) Handles btnSubmit.Click
            Try
                Dim messagetext As String = "How can we help you? Anything we should know?"
                Dim subject As String = Settings("subject")
                Dim message As String = ""
                Dim [to] As String = Settings("to")
                Dim from As String = Settings("from")
                Dim replyTo As String = txtEmail.Text

                message &= String.Format("Name: {0}" & vbCrLf, txtName.Text)
                message &= String.Format("Email: {0}" & vbCrLf, txtEmail.Text)
                message &= String.Format("Phone: {0}" & vbCrLf, txtPhone.Text)
                message &= String.Format("Best Time to Call: {0}" & vbCrLf, ddlCallTime.SelectedValue)

                Dim email As New MailMessage(from, [to])
                email.ReplyTo = New MailAddress(replyTo)
                email.Subject = subject
                email.BodyEncoding = System.Text.Encoding.UTF8
                email.Body = message
                email.IsBodyHtml = False
                Dim smtpserver() As String = Host.SMTPServer.Split(":")
                Dim client As New SmtpClient(smtpserver(0))
                If smtpserver.Length > 1 Then
                    client.Port = Integer.Parse(smtpserver(1))
                End If

                If Host.SMTPAuthentication <> "SMTPAnonymous" Then
                    client.Credentials = New NetworkCredential(Host.SMTPUsername, Host.SMTPPassword)
                    '
                End If
                client.EnableSsl = True
                client.Send(email)

                Response.Redirect(Settings("responsePageURL"))
            Catch exc As Exception
                ProcessModuleLoadException(Me, exc)
            End Try
        End Sub
    End Class



End Namespace
