import { createPaginationMetaData } from '@utils';

describe('Pagination Utility', () => {
  describe('createPaginationMetaData', () => {
    it('should create pagination metadata for first page', () => {
      // Arrange
      const props = {
        totalItems: 25,
        pageSize: 10,
        currentPage: 1,
      };

      // Act
      const result = createPaginationMetaData(props);

      // Assert
      expect(result).toEqual({
        total_items: 25,
        page_size: 10,
        total_pages: 3,
        page: 1,
        has_next_page: true,
        has_prev_page: false,
      });
    });

    it('should create pagination metadata for middle page', () => {
      // Arrange
      const props = {
        totalItems: 25,
        pageSize: 10,
        currentPage: 2,
      };

      // Act
      const result = createPaginationMetaData(props);

      // Assert
      expect(result).toEqual({
        total_items: 25,
        page_size: 10,
        total_pages: 3,
        page: 2,
        has_next_page: true,
        has_prev_page: true,
      });
    });

    it('should create pagination metadata for last page', () => {
      // Arrange
      const props = {
        totalItems: 25,
        pageSize: 10,
        currentPage: 3,
      };

      // Act
      const result = createPaginationMetaData(props);

      // Assert
      expect(result).toEqual({
        total_items: 25,
        page_size: 10,
        total_pages: 3,
        page: 3,
        has_next_page: false,
        has_prev_page: true,
      });
    });

    it('should handle single page with all items', () => {
      // Arrange
      const props = {
        totalItems: 5,
        pageSize: 10,
        currentPage: 1,
      };

      // Act
      const result = createPaginationMetaData(props);

      // Assert
      expect(result).toEqual({
        total_items: 5,
        page_size: 10,
        total_pages: 1,
        page: 1,
        has_next_page: false,
        has_prev_page: false,
      });
    });

    it('should handle empty results', () => {
      // Arrange
      const props = {
        totalItems: 0,
        pageSize: 10,
        currentPage: 1,
      };

      // Act
      const result = createPaginationMetaData(props);

      // Assert
      expect(result).toEqual({
        total_items: 0,
        page_size: 10,
        total_pages: 0,
        page: 1,
        has_next_page: false,
        has_prev_page: false,
      });
    });

    it('should handle page size larger than total items', () => {
      // Arrange
      const props = {
        totalItems: 3,
        pageSize: 10,
        currentPage: 1,
      };

      // Act
      const result = createPaginationMetaData(props);

      // Assert
      expect(result).toEqual({
        total_items: 3,
        page_size: 10,
        total_pages: 1,
        page: 1,
        has_next_page: false,
        has_prev_page: false,
      });
    });

    it('should handle exact division of items', () => {
      // Arrange
      const props = {
        totalItems: 20,
        pageSize: 5,
        currentPage: 2,
      };

      // Act
      const result = createPaginationMetaData(props);

      // Assert
      expect(result).toEqual({
        total_items: 20,
        page_size: 5,
        total_pages: 4,
        page: 2,
        has_next_page: true,
        has_prev_page: true,
      });
    });

    it('should handle large numbers', () => {
      // Arrange
      const props = {
        totalItems: 1000000,
        pageSize: 100,
        currentPage: 5000,
      };

      // Act
      const result = createPaginationMetaData(props);

      // Assert
      expect(result).toEqual({
        total_items: 1000000,
        page_size: 100,
        total_pages: 10000,
        page: 5000,
        has_next_page: true,
        has_prev_page: true,
      });
    });

    it('should handle page size of 1', () => {
      // Arrange
      const props = {
        totalItems: 5,
        pageSize: 1,
        currentPage: 3,
      };

      // Act
      const result = createPaginationMetaData(props);

      // Assert
      expect(result).toEqual({
        total_items: 5,
        page_size: 1,
        total_pages: 5,
        page: 3,
        has_next_page: true,
        has_prev_page: true,
      });
    });

    it('should handle edge case with zero page size', () => {
      // Arrange
      const props = {
        totalItems: 10,
        pageSize: 0,
        currentPage: 1,
      };

      // Act
      const result = createPaginationMetaData(props);

      // Assert
      expect(result).toEqual({
        total_items: 10,
        page_size: 0,
        total_pages: 1,
        page: 1,
        has_next_page: false,
        has_prev_page: false,
      });
    });
  });
});
