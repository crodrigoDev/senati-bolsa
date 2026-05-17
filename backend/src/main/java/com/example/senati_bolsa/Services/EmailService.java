package com.example.senati_bolsa.Services;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class EmailService {
    private final JavaMailSender emailSender;

    @Value("${spring.mail.username")
    private String remitente;

    @Async
    public void enviarCodigoVerificacion(String correoDestino, String nombre, String codigo){
        String asunto = "Código de Recuperación - Bolsa de Senati";

        String contenidoHTML = """
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #eee; padding: 20px;">
                    <h2 style="color: #00529C; text-align: center;">Bolsa de Trabajo Senati</h2>
                    <p>Hola, <strong>%s</strong>:</p>
                    <p>Hemos recibido una solicitud para restablecer tu contraseña. Ingresa el siguiente código de 6 dígitos en la aplicación para continuar:</p>
                    <div style="text-align: center; margin: 30px 0;">
                        <span style="font-size: 28px; font-weight: bold; background-color: #f4f4f4; padding: 12px 25px; letter-spacing: 5px; border-radius: 5px; border: 1px dashed #00529C; color: #00529C; display: inline-block;">
                            %s
                        </span>
                    </div>
                    <p style="color: #777; font-size: 12px;">Este código expirará en 15 minutos. Si tú no solicitaste este cambio, puedes ignorar este mensaje.</p>
                </div>
            """.formatted(nombre, codigo);

            enviarCorreoBase(correoDestino, asunto, contenidoHTML);
    }

    private void enviarCorreoBase(String correoDestino, String asunto, String contenidoHTML){
        try {
            MimeMessage message = emailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");
            helper.setFrom(remitente);
            helper.setTo(correoDestino);
            helper.setSubject(asunto);
            helper.setText(contenidoHTML, true);
            emailSender.send(message);
        } catch(MessagingException e){
            throw new RuntimeException("Error al enviar el correo a: " + correoDestino, e);
        }
    }

}
