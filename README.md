# Typeahead

Typeahead is a simple autocomplete search written in javascript that allows for more complex searches. In this specific exampe, Typeahead searches from the available formulas based of the 'context' within a search - meaning for an input after a space, comma, or open or closing parenthesis, the context for the search is reset. This allows a user to combine and enter multiples formulas.

Currently the formulas available are:
'sum', 'min', 'avg', 'max', '@revenue', '@created_at', '@count'