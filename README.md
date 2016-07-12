# Typeahead

Typeahead is a simple autocomplete search written in javascript, specifically for formulas. Typeahead searches from the available formulas based of the 'context' within a search - meaning after a space, comma, or open or closing parenthesis, the context for the search is reset. In this specific example, this allows a user to combine and enter multiples formulas. Overall, it allows for more complex searches.

Currently the formulas available are:
'sum', 'min', 'avg', 'max', '@revenue', '@created_at', '@count'