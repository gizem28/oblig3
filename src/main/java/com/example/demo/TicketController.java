package com.example.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/tickets")
public class TicketController {

    private final TicketRepository ticketRepository;

    @Autowired
    public TicketController(TicketRepository ticketRepository) {
        this.ticketRepository = ticketRepository;
    }

    // Bilet oluşturmak için bir POST isteği handler'ı
    @PostMapping("/tickets")
    public ResponseEntity<Ticket> createTicket(@RequestBody Ticket ticket) {
        Ticket savedTicket = ticketRepository.save(ticket);
        return ResponseEntity.ok(savedTicket);
    }

    // Biletleri listelemek için bir GET isteği handler'ı
    @GetMapping("/tickets")
    public ResponseEntity<List<Ticket>> getAllTickets() {
        List<Ticket> tickets = ticketRepository.findAll();
        return ResponseEntity.ok(tickets);
    }


    @PutMapping("/{id}")
    public Ticket updateTicket(@PathVariable Long id, @RequestBody Ticket updatedTicket) {
        return ticketRepository.findById(id)
                .map(ticket -> {
                    ticket.setFilmName(updatedTicket.getFilmName());
                    ticket.setQuantity(updatedTicket.getQuantity());
                    ticket.setFirstName(updatedTicket.getFirstName());
                    ticket.setLastName(updatedTicket.getLastName());
                    ticket.setPhoneNumber(updatedTicket.getPhoneNumber());
                    ticket.setEmail(updatedTicket.getEmail());
                    return ticketRepository.save(ticket);
                }).orElseGet(() -> {
                    updatedTicket.setId(id);
                    return ticketRepository.save(updatedTicket);
                });
    }

    // Bilet sil
    @DeleteMapping("/{id}")
    public void deleteTicket(@PathVariable Long id) {
        ticketRepository.deleteById(id);
    }
}
