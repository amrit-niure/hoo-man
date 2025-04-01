// lib/pdf-generator.ts
import { jsPDF } from "jspdf";
import { Payslip } from "@prisma/client";

export async function generatePayslipPDF(payslip: Payslip & { employee: { name: string } }) {
  const doc = new jsPDF();

  // Add company logo and header
  doc.setFontSize(20);
  doc.text("PAYSLIP", 105, 20, { align: "center" });
  doc.setFontSize(12);
  doc.text(`Pay Period: ${payslip.payPeriodStart.toDateString()} - ${payslip.payPeriodEnd.toDateString()}`, 105, 30, { align: "center" });

  // Employee details
  doc.setFontSize(14);
  doc.text("Employee Details", 20, 50);
  doc.setFontSize(12);
  doc.text(`Name: ${payslip.employee.name}`, 20, 60);
  doc.text(`Payment Date: ${payslip.paymentDate?.toDateString() || "Pending"}`, 20, 70);

  // Earnings and deductions
  doc.setFontSize(14);
  doc.text("Earnings", 20, 90);
  doc.setFontSize(12);
  doc.text(`Hours Worked: ${payslip.hoursWorked.toFixed(2)}`, 20, 100);
  doc.text(`Hourly Rate: $${payslip.hourlyRate.toFixed(2)}`, 20, 110);
  doc.text(`Gross Pay: $${payslip.grossAmount.toFixed(2)}`, 20, 120);

  doc.setFontSize(14);
  doc.text("Deductions", 105, 90);
  doc.setFontSize(12);
  doc.text(`Tax: $${payslip.taxAmount.toFixed(2)}`, 105, 100);
  doc.text(`Superannuation: $${payslip.superAmount.toFixed(2)}`, 105, 110);
  doc.text(`Leave Deductions: $${payslip.leaveDeductions.toFixed(2)}`, 105, 120);

  // Net pay
  doc.setFontSize(16);
  doc.text(`Net Pay: $${payslip.netAmount.toFixed(2)}`, 105, 150, { align: "center" });

  // Footer
  doc.setFontSize(10);
  doc.text("Thank you for your hard work!", 105, 180, { align: "center" });

  return doc.output("blob");
}