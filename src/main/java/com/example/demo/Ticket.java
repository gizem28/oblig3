package com.example.demo;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Ticket {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)

    private Long id;
    private String filmName;
    private int quantity;
    private String firstName;
    private String lastName;
    private String phoneNumber;
    private String email;

    public Ticket() {

    }

    public Long getId() {
        return id;
    }

    public String getFilmName() {
        return filmName;
    }

    public int getQuantity() {
        return quantity;
    }

    public String getFirstName() {
        return firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setFilmName(String filmName) {
        this.filmName = filmName;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Ticket(Long id, String filmName, int quantity, String firstName, String lastName, String phoneNumber, String email) {
        this.id = id;
        this.filmName = filmName;
        this.quantity = quantity;
        this.firstName = firstName;
        this.lastName = lastName;
        this.phoneNumber = phoneNumber;
        this.email = email;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public String getEmail() {
        return email;
    }
}
