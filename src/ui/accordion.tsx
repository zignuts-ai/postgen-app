import React from 'react'
import { Accordion as MUIAccordion, AccordionSummary, AccordionDetails, Typography } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

// Main Accordion component that wraps MUI's Accordion
export const Accordion = ({ children, ...props }: any) => <MUIAccordion {...props}>{children}</MUIAccordion>

// AccordionItem is essentially the same as the Accordion in MUI
export const AccordionItem = Accordion

// AccordionTrigger component
export const AccordionTrigger = ({ children, ...props }: any) => (
  <AccordionSummary
    expandIcon={<ExpandMoreIcon />}
    {...props}
    sx={{
      '& .MuiAccordionSummary-expandIconWrapper': {
        transition: 'transform 0.2s'
      },
      '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
        transform: 'rotate(180deg)'
      },
      ...props.sx
    }}
  >
    {typeof children === 'string' ? <Typography>{children}</Typography> : children}
  </AccordionSummary>
)

// AccordionContent component
export const AccordionContent = ({ children, ...props }: any) => (
  <AccordionDetails {...props}>{children}</AccordionDetails>
)

// Example usage
export const AccordionExample = () => (
  <Accordion>
    <AccordionTrigger>First Accordion</AccordionTrigger>
    <AccordionContent>Content for the first accordion section</AccordionContent>
  </Accordion>
)
