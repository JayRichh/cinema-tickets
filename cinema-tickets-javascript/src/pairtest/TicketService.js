import TicketTypeRequest from './lib/TicketTypeRequest.js';
import InvalidPurchaseException from './lib/InvalidPurchaseException.js';

//! Task:
// Provide a working implementation of a `TicketService` that:
// - Considers the above objective, business rules, constraints & assumptions.
// - Calculates the correct amount for the requested tickets and makes a payment request to the `TicketPaymentService`.  
// - Calculates the correct no of seats to reserve and makes a seat reservation request to the `SeatReservationService`.  
// - Rejects any invalid ticket purchase requests. It is up to you to identify what should be deemed as an invalid purchase request

// - There are 3 types of tickets i.e. Infant, Child, and Adult.
// - The ticket prices are based on the type of ticket (see table below).
// - The ticket purchaser declares how many and what type of tickets they want to buy.
// - Multiple tickets can be purchased at any given time.
// - Only a maximum of 20 tickets that can be purchased at a time.
// - Infants do not pay for a ticket and are not allocated a seat. They will be sitting on an Adult's lap.
// - Child and Infant tickets cannot be purchased without purchasing an Adult ticket.
// infant ticket price: 0
// child ticket price: 10
// adult ticket price: 20


export default class TicketService {
  /**
   * Should only have private methods other than the one below.
   */
  // Calculates the correct amount for the requested tickets
  // Rejects any invalid ticket purchase requests. accounts with an id greater than zero are valid.
  
  _calculateTotalPrice(accountId, ...ticketTypeRequests) {
   let totalPrice = 0;
    let noOfAdultTickets = 0;
    let noOfChildTickets = 0;
    let noOfInfantTickets = 0;
    let totalNoOfTickets = 0;
    let invalidPurchase = false;

    ticketTypeRequests.forEach((ticketTypeRequest) => {
      switch (ticketTypeRequest) {
        case TicketTypeRequest.ADULT:
          totalPrice += 20;
          noOfAdultTickets++;
          break;
        case TicketTypeRequest.CHILD:
          totalPrice += 10;
          noOfChildTickets++;
          break;
        case TicketTypeRequest.INFANT:
          noOfInfantTickets++;
          break;
        default:
          invalidPurchase = true;
      }
    });

    totalNoOfTickets = noOfAdultTickets + noOfChildTickets + noOfInfantTickets;

    if (totalNoOfTickets > 20) {
      invalidPurchase = true;
    }

    if (noOfInfantTickets > 0 && noOfAdultTickets === 0) {
      invalidPurchase = true;
    }

    if (noOfChildTickets > 0 && noOfAdultTickets === 0) {
      invalidPurchase = true;
    }

    if (accountId <= 0) {
      invalidPurchase = true;
    }

    if (invalidPurchase) {
      throw new InvalidPurchaseException();
    }

    return totalPrice;
  }

  // Calculates the correct no of seats to reserve and makes a seat reservation request to the `SeatReservationService`.
  // The seat will always be reserved once a reservation request has been made to the `SeatReservationService`.
  _makeSeatReservation(accountId, noOfAdultTickets, noOfChildTickets, noOfInfantTickets) {
  }

  purchaseTickets(accountId, ...ticketTypeRequests) {
    // throws InvalidPurchaseException
  }

  // Makes a payment request to the `TicketPaymentService`
  // The payment will always go through once a payment request has been made to the `TicketPaymentService`.
  _makePayment(accountId, totalPrice) {
  }

  // 
  _checkPaymentValid(accountId, totalPrice) {
    
}
