package com.mgorner.endpoints;

import java.io.IOException;
import javax.servlet.http.*;

@SuppressWarnings("serial")
public class Cloud_endpoints_start8Servlet extends HttpServlet {
	public void doGet(HttpServletRequest req, HttpServletResponse resp)
			throws IOException {
		resp.setContentType("text/plain");
		resp.getWriter().println("Hello, world");
	}
}
